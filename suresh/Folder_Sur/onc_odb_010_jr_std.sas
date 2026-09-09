/*************************************************************************************************;
%* Report Description:                                                                            ;
%* This report output all Oncologic Drugs and Biologic provided 14 days prior to/after the start  ;
%* of a SAE or ECI, that are not present in the CM form.                                          ;
%*************************************************************************************************;
%* Report Logic:                                                                                  ;
%* AND                                                                                            ;
%* Logic 1.2 SAE/ECI with Onset Date <> null                                                      ;
%* AND                                                                                            ;
%* Logic 1.3 ODB_FORM duration is overlap with SAE/ECI duration                                   ;
%* AND                                                                                            ;
%* There is no at least one CM record meet below criteria:                                        ;
%* Logic 1.4 CM. Medication Category = Oncologic                                                  ;
%* AND                                                                                            ;
%* Logic 1.5 CM. Standardized Medication Name = ODB_FORM Standardized Oncologic Drug or Biologic  ;
%* Name from record identified in logic 1.1                                                       ;
%* AND                                                                                            ;
%* Logic 1.6 CM. Imputed Start Date and Time = ODB_FORM Imputed Start Date of Medication from     ;
%* record identified in logic 1.1                                                                 ;
%* Note 1: Please consider a SAE any AE record with either:                                       ;
%* -       Serious Criteria <> Null AND Serious Criteria <> None OR                               ;
%* -       Is the AE an Event of Clinical Interest? = Yes                                         ;
%* Note 2: Disregard time in CM and AE and ODB_FORM                                               ;
%* Note 3: ODB_FORM includes ODB, ODBF, ODBCF, ODBCS, ODBH, ODBHF, ODBHN, ODBNF.                  ;
%* Note 4: Clarification for duration in logic 1.3:                                               ;
%* 1.      ODB_FORM duration -  ODB_FORM. Imputed Start Date of Medication TO ODB_FORM. Imputed   ;
%* Stop Date of Medication                                                                        ;
%* 2.      SAE/ECI duration - SAE Onset Date -14 TO SAE Onset Date + 14                           ;
%* Note 5: Please exclude deleted records and erroneous visits from programming.                  ;
%* Note 6: ODB_FORM. Imputed Stop Date of Medication is considered as system date when value is   ;
%* NULL                                                                                           ;
%* Note7:For older studies where imputed start/stop date of medication is not available consider  ;
%* to use imputed start/stop date of regimen.                                                     ;
%*************************************************************************************************;
%* Program Flow:                                                                                  ;
%* 1.Get dataset for subject/dov/odb/cm/sae form                                                  ;
%* 2. Based on study, get Date from ODB Form and ODB Add Entry Form                               ;
%* 3. Final Dataset with subdataset filter                                                        ;
%* 4. Generate output to Excel                                                                    ;
%*************************************************************************************************;
%* Macros Used:                                                                                   ;
%* gdmsrpt_macros                                                                                 ;
%*************************************************************************************************;
%* Revision History:                                                                              ;
%* Version 1 - Initial Version                                                                    ;
%* Version 2 - Global supporting doc ODB_supp_doc and ODBF_supp_doc add, corressponding logic     ;
%* update to match the global supporting doc.                                                     ;
%* [Lu Yao,Dong - 10Jan2022]                                                                      ;
%* Version 3 - Code update to improve performance, no logic and layout update.                    ;
%* [Lu Yao,Dong - 31Jan2023]                                                                      ;
%* Version 4 - Report Description, Screnario and Logic update to include '14 days after the start ;
%* of a SAE or ECI'.[Tianle Sun - 26May2023]                                                      ;
%*************************************************************************************************;
*/

%macro onc_odb_010_jr_std;

%let checkid = %upcase(onc_odb_010_jr_std);
%let vernum = 4;
%let reptitle=Non-study related oncologic treatment reconciliation; 
%let repdesc=This report output all Oncologic Drugs and Biologic provided 14 days prior to/after the start of a SAE or ECI, that are not present in the CM form. ;

%gdmsrptheader;
%orasetup;
	
%* --- 1. Get information from supporting doc  --- *;
	%* --- 1.1.1 Global supporting document --- *;
	filename supp "/cdm/prod/extfiles/Supp_Docs/OTHER_GLOBAL_SUPP/ODB_supp_doc.csv";
/*	filename supp "C:\Users\suntianl\Downloads\JRSUPP\ODB_supp_doc.csv";*/


	data g_odb_supp;
		format viewname $50. original_itemquestion $200. itemquestion $200. controllevel $10. columnname $200. prefix $10.;
		infile supp missover pad DSD delimiter = ',' firstobs=2;
		input viewname original_itemquestion itemquestion controllevel columnname prefix;
		if missing(_INFILE_) then delete;
		form_alias='ODB';
	run;

	filename supp "/cdm/prod/extfiles/Supp_Docs/OTHER_GLOBAL_SUPP/ODBF_supp_doc.csv";
/*	filename supp "C:\Users\suntianl\Downloads\JRSUPP\ODBF_supp_doc.csv";*/
	data g_odbf_supp;
		format viewname $50. original_itemquestion $200. itemquestion $200. controllevel $10. columnname $200. prefix $10.;
		infile supp missover pad DSD delimiter = ',' firstobs=2;
		input viewname original_itemquestion itemquestion controllevel columnname prefix;
		if missing(_INFILE_) then delete;
		form_alias='ODB';
	run;

	data global_supp;
		format formname $50. viewname $50. original_itemquestion $200. itemquestion $200. controllevel $10. columnname $200. prefix $10.;
		set g_odb_supp g_odbf_supp;
		formname=substr(viewname,4,find(cats(viewname,'_'),'_',4)-4);
	run;

	%supp(global_supp);
	%obscnt(global_supp);
	%let gcnt_list = &nobs;

%* --- 3. Manage itemquestion according to spec and forms based on study ---*;
	%* --- 3.1 get rd_datadictionary and define form/item based on study ---*;
	proc sql noprint;
	    connect to oracle as dbtest
	    (user=PDAMREAD orapw="&orpass" path=&dbpth connection=global);

	    create table subject as select * from connection to dbtest
	      (
	       select a.subjectid, b.sitecountry as country, b.sitemnemonic as sitenbr, 
		 		  a.subjectnumberstr as subjnbr, b.sascorressnumit as screennbr
	         from &protocol.&id2..irv_cur_subject a, &protocol&id2..cv_safm b
	        where a.subjectid = b.subjectid
/*			  and instr(a.subjectnumberstr,'--')>0*/          /*Randomized Olny*/
	        order by a.subjectid
	       );

	    create table dov as select * from connection to dbtest
		    (
		     select subjectid, visitid, visitmnemonic, dt_dov, dovserrorvcb_dovserrorvsc__1 as err_visit 
			 	from &protocol&id2..cv_dovfm
			  where 1 = 1 order by subjectid, visitid
		    );

		insert into global_supp
          values('CMFM','CV_CMFM','IMPUTED START DATE','IMPUTED START DATE','1','DT_CMSTDTIIT','DT','CM')
		  values('CMFM','CV_CMFM','IMPUTED START DATE AND TIME','IMPUTED START DATE','1','DT_CMSTDTIIT','DT','CM')
		  values('CMFM','CV_CMFM','STANDARDIZED MEDICATION NAME','STANDARDIZED MEDICATION NAME','1','CMDECODIT','CD','CM')
		  values('CMFM','CV_CMFM','MEDICATION CATEGORY','MEDICATION CATEGORY','1','CMMEDCATRC_CMMEDCATIT','CD','CM')
		  values('CMFM','CV_CMFM','MEDICATION CATEGORY','MEDICATION CATEGORY','1','CMSCATRC_CMSCATIT','CD','CM')
		  ;

	    select distinct catt("'",formname,"'") into :allform separated by ',' from global_supp;

	    create table rd_datadictionary as select * from connection to dbtest
		    (
		     select distinct formrefname,viewname, itemquestion, columnname 
			   from &protocol.&id2..cv_datadictionary 
		   	  where formrefname in (&allform)
	          order by formrefname
		    );
   
	    create table studyfm as
		 	select s.*,
			       COALESCEC((select distinct cat(strip(columnname),' AS FORMIDX_m') from rd_datadictionary formidx where cats('CV_',strip(s.formname)) = formidx.viewname and columnname = 'FORMIDX'),'0 AS FORMIDX_m') as mformidx,
	               COALESCEC((select distinct cat(strip(columnname),' AS DELETEDFORM_m') from rd_datadictionary deletedform where cats('CV_',strip(s.formname)) = deletedform.viewname and columnname = 'DELETEDFORM'),'NULL AS DELETEDFORM_m') as mdeletedform,
				   COALESCEC((select distinct cat(strip(columnname),' AS ITEMSETIDX_a') from rd_datadictionary itemsetidx where s.viewname = itemsetidx.viewname and columnname = 'ITEMSETIDX'),'0 AS ITEMSETIDX_a') as aitemsetidx,
				   COALESCEC((select distinct cat(strip(columnname),' AS DELETEDFORM_a') from rd_datadictionary deletedform where s.viewname = deletedform.viewname and columnname = 'DELETEDFORM'),'NULL AS DELETEDFORM_a') as adeletedform,
	               COALESCEC((select distinct cat(strip(columnname),' AS DELETEDITEM_a') from rd_datadictionary deleteditem where s.viewname = deleteditem.viewname and columnname = 'DELETEDITEM'),'NULL AS DELETEDITEM_a') as adeleteditem
	          from global_supp s inner join rd_datadictionary r
			    on s.viewname = r.viewname
			   and s.columnname = r.columnname 
			   and strip(s.original_itemquestion) = upper(strip(r.itemquestion))
			 order by s.viewname, s.itemquestion;

		create table sae as select * from connection to dbtest
	   (
		select subjectid, aeseq, nsae, sercri, interst,
			  (case when nvl(nsae,'BLANK') <> 'None' and sercri is not null or interst='Yes' 
				    then 'Yes'
        		    else 'No' end) as sae, onsetdt, llt
			  from (select subjectid, aeseq, nsae, sercri, interst, onsetdt, sae_duration, ongoingyn, llt
  			  from(select a.subjectid, nvl(a.aeaespidit, a.formidx) as aeseq, 
          		   to_date(to_char(dt_aeaestdtcit,'DD/MM/YYYY'),'DD/MM/YYYY') as onsetdt, 
          		   to_date(to_char(dt_aeaeendtcdt_aeaeendtcit,'DD/MM/YYYY'),'DD/MM/YYYY') as stopdt, 
          		   c_aeaeoutdurrc_aeaeendtcit as sae_duration,
          		   aeaeoutdurrc_aeaeendtcit as ongoingyn,
          		   aeaesercncb_aeaesercnsc_ae_1 as nsae,
          		   c_aeaeserhospcb_aeaeserhos_1 ||
          		   c_aeaesercancb_aeaesercans_1 ||
          		   c_aeaeserlifecb_aeaeserlif_1 ||
          		   c_aeaeserdisabcb_aeaeserdi_1 ||
          		   c_aeaesercongcb_aeaesercon_1 ||
          		   c_aeaeserodcb_aeaeserodsc__1 ||
          		   c_aeaesersimecb_aeaesersim_1 ||
          		   c_aeaeserdthcb_aeaeevntaut_1 as sercri,
          		   aeaeclintrc_aeaeclintit as interst,
          		   aeaelltit as llt
    		  from &protocol.&id2..cv_aefm a left join &protocol.&id2..cv_aefm_aetoxicitysn_aecfo_1 aadd
   			    on a.subjectid = aadd.subjectid
     		   and a.formindex = aadd.formindex
     		 where nvl(a.deletedform, 'N')='N'
     		   and nvl(aadd.deleteditem, 'N')='N'
     		   and nvl(aadd.deletedform, 'N')='N'
     		   and dt_aeaestdtcit is not null
		)));

	    disconnect from dbtest;
	quit;

	data sae(keep = subjectid aeseq nsae sercri interst sae ae_onsetdt llt);
	 set sae;
	 ae_onsetdt = datepart(onsetdt);
	 format ae_onsetdt yymmdd10.;
	run;

	%* --- 3.2 Programmer Action Needed: Assign form/item alias based on itemquestion and form based on report design ---*;
	data study_supp_alias (keep=formname viewname columnname item_alias form_alias mformidx mdeletedform aitemsetidx adeletedform adeleteditem);
		set studyfm;
		format item_alias $50.;
		if upcase(strip(form_alias))='ODB' and upcase(compbl(itemquestion)) in ('IMPUTED START DATE OF REGIMEN') and prefix='DT' and controllevel = '1' then do;
	         item_alias = 'dt_str_reg';
	    end;
		else if upcase(strip(form_alias))='ODB' and upcase(compbl(itemquestion)) in ('IMPUTED STOP DATE OF REGIMEN') and prefix='DT' and controllevel = '1' then do; 
			item_alias = 'dt_end_red';
		end;
		else if upcase(strip(form_alias))='ODB' and upcase(compbl(itemquestion)) in ('IMPUTED START DATE OF MEDICATION') and prefix='DT' and controllevel = '1' then do; 
			item_alias = 'dt_str_med';
		end;
		else if upcase(strip(form_alias))='ODB' and upcase(compbl(itemquestion)) in ('IMPUTED STOP DATE OF MEDICATION') and prefix='DT' and controllevel = '1' then do; 
			item_alias = 'dt_end_med';
		end;
		else if upcase(strip(form_alias))='ODB' and upcase(compbl(itemquestion)) in ('STANDARDIZED ONCOLOGIC DRUG OR BIOLOGIC NAME') and prefix='CD' and controllevel = '1' then do; 
			item_alias = 'odb_name';
		end;
		else if upcase(strip(form_alias))='CM' and upcase(compbl(itemquestion)) in ('IMPUTED START DATE') and prefix='DT' and controllevel = '1' then do; 
			item_alias = 'dt_cm';
		end;
		else if upcase(strip(form_alias))='CM' and upcase(compbl(itemquestion)) in ('STANDARDIZED MEDICATION NAME') and prefix='CD' and controllevel = '1' then do; 
			item_alias = 'cm_sm';
		end;
		else if upcase(strip(form_alias))='CM' and upcase(compbl(itemquestion)) in ('MEDICATION CATEGORY') and prefix='CD' and controllevel = '1' then do; 
			item_alias = 'cm_cat';
		end;
		if not missing(item_alias);
	run;

	%* --- 3.3 Proceed item variation ---*;
	proc sort data=study_supp_alias;
		by form_alias formname viewname item_alias;
	run;

	data dic_vary;
		set study_supp_alias;
		by form_alias formname viewname item_alias;
		format varycom $4000. ;
		retain varycom;
		if first.item_alias then do;
			varycom = strip(columnname);
	    end;
		else do;
			varycom = 'NVL(' || strip(varycom) || ',' || strip(columnname) || ')';
		end;
		if last.item_alias then output;
	run;

	data dic_all (keep=form_alias formname viewname columnlst mformidx mdeletedform aitemsetidx adeletedform adeleteditem);
		set dic_vary;
		by form_alias formname;
		format columnlst $4000. ;
		retain columnlst;
		if first.formname then do;
			columnlst='m.subjectid,m.visitid,m.visitorder,m.visitmnemonic,m.formid,m.formmnemonic';
		end;
		columnlst = catx(',',columnlst,cat(strip(varycom),' as ', strip(item_alias)));
		if last.formname then output;
	run;

	data _null_;
		set dic_all  end=eof;
		call symput('formalias'||left(_n_),strip(form_alias));
		call symput('viewmain'||left(_n_),cats('CV_',strip(formname)));
		call symput('viewadd'||left(_n_),strip(viewname));
		call symput('columnlst'||left(_n_),strip(columnlst));
		call symput('mformidx'||left(_n_),strip(mformidx));
		call symput('mdeletedform'||left(_n_),strip(mdeletedform));
		call symput('aitemsetidx'||left(_n_),strip(aitemsetidx));
		call symput('adeletedform'||left(_n_),strip(adeletedform));
		call symput('adeleteditem'||left(_n_),strip(adeleteditem));
		if eof then	call symput('ecrf_nbr',_n_);
	run;
	%obscnt(dic_all);
	%let dic_cnt = &nobs;

    %* --- 3.4 Get Study form data based on report design ---*;
	data odb_0;
		format subjectid best12. visitid best12. visitorder best12. visitmnemonic $4000. formid best12. formmnemonic $4000. formidx_m best12. itemsetidx_a best12. 
        	   dt_str_reg datetime20. dt_end_red datetime20. dt_str_med datetime20. dt_end_med datetime20. odb_name $4000.;
		stop;
	run;

	data cm_0;
		format subjectid best12. visitid best12. visitorder best12. visitmnemonic $4000. formid best12. formmnemonic $4000. formidx_m best12. itemsetidx_a best12. 
        	   dt_cm datetime20. cm_sm $4000. cm_cat $4000.;
		stop;
	run;

	%macro movetable(table);
		proc delete data=&table;
		run;
	%mend;

	%macro gdataset;
	%GLOBAL odbformdis;
	%if &dic_cnt>0 %then %do; 
		proc sql;
			connect to oracle as dbtest (user=PDAMREAD orapw="&orpass" path=&dbpth connection=global);

			%do i = 1 %to &ecrf_nbr;
				%if &&viewmain&i ne &&viewadd&i %then %do;
					create table &&formalias&i.._&i as select * from connection to dbtest
					(select v.*, d.dt_dov from
						(select &&columnlst&i,FORMIDX_m,ITEMSETIDX_a as ITEMSETIDX_a
			              from (select * from (select ma.*,&&mformidx&i, &&mdeletedform&i from &protocol.&id2..&&viewmain&i ma) where coalesce(DELETEDFORM_m, 'N') = 'N') m left join
						       (select * from (select ad.*,&&aitemsetidx&i, &&adeletedform&i, &&adeleteditem&i from &protocol.&id2..&&viewadd&i ad) 
		                         where coalesce(DELETEDFORM_a, 'N') = 'N' 
								   and coalesce(DELETEDITEM_a, 'N') = 'N'  
		                        ) a
						    on m.subjectid = a.subjectid
						   and m.formindex = a.formindex
	                      union
						  select &&columnlst&i,FORMIDX_m,ITEMSETIDX_a as ITEMSETIDX_a
			              from (select * from (select ad.*,&&aitemsetidx&i, &&adeletedform&i, &&adeleteditem&i from &protocol.&id2..&&viewadd&i ad) 
		                         where coalesce(DELETEDFORM_a, 'N') = 'N' 
								   and coalesce(DELETEDITEM_a, 'N') = 'N'  
		                        ) m left join
	                           (select * from (select ma.*,&&mformidx&i, &&mdeletedform&i from &protocol.&id2..&&viewmain&i ma) where coalesce(DELETEDFORM_m, 'N') = 'N') a
						    on m.subjectid = a.subjectid
						   and m.formindex = a.formindex
			            ) v left join &protocol&id2..cv_dovfm d
						 on v.subjectid = d.subjectid
						and v.visitid = d.visitid
					  where d.dovserrorvcb_dovserrorvsc__1 is null
					);
				%end;
				%else %do;
					create table &&formalias&i.._&i as select * from connection to dbtest
						(select &&columnlst&i,FORMIDX_m,0 as ITEMSETIDX_a, d.dt_dov 
		                   from ( select ma.*,&&mformidx&i, &&mdeletedform&i from &protocol.&id2..&&viewmain&i ma) m left join &protocol&id2..cv_dovfm d
						     on m.subjectid = d.subjectid
						    and m.visitid = d.visitid
						  where d.dovserrorvcb_dovserrorvsc__1 is null
		                    and coalesce(DELETEDFORM_m, 'N') = 'N' 
						);
				%end;
			%end;
			disconnect from dbtest;
		quit;

		data odb;
			set odb_:;
		run;

		data cm;
			set cm_:;
		run;

    %end;

	%do i = 0 %to &ecrf_nbr;
		%movetable(odb_&i cm_&i);
	%end;

	%mend;
	%gdataset;

	data odbfm(drop = dt_str_med dt_end_med dt_str_reg dt_end_red);
		set odb;
		%if %length(&odbform) gt 0  %then %do;
			%let odbformdis = %sysfunc(upcase(&odbform));
			%let odbformlist = %sysfunc(catq(1ac,&odbformdis));
			where formmnemonic in (&odbformlist);
		%end;
		%else %do;
			%let odbformdis = All;
        %end;
		str_med_dt = datepart(dt_str_med);
		end_med_dt = datepart(dt_end_med);
		str_reg_dt = datepart(dt_str_reg);
		end_red_dt = datepart(dt_end_red);
		format str_med_dt yymmdd10. end_med_dt yymmdd10. str_reg_dt yymmdd10. end_red_dt yymmdd10. ;
	run;

	data cm(drop = dt_cm);
		set cm;
		cm_stdt = datepart(dt_cm);
		format cm_stdt yymmdd10. 
	run;

	proc sql;
		   create table odb_final as select * from 
		      (select subjectid, visitid, visitmnemonic, formmnemonic, formidx, itemsetidx, odb_name, odb_str_dt,
				/*If ODB stop date is blank, use system date.*/
				 case when odb_end_dt is null then today() else odb_end_dt end as odb_end_dt format yymmdd10.,
				 case when odb_end_dt is not null then put(odb_end_dt,yymmdd10.) else 'Continuing' end as dis_odb_end_dt
				 from (
				select subjectid, visitid, visitmnemonic, formmnemonic, formidx_m as formidx, itemsetidx_a as itemsetidx, odb_name,
					   coalesce(str_med_dt,str_reg_dt) as odb_str_dt format yymmdd10., coalesce(end_med_dt,end_red_dt) as odb_end_dt format yymmdd10.
				  from odbfm
				) 
			  where odb_str_dt is not null
			  );
	quit;

%* --- 5. Final Dataset with subdataset filter  --- *;	
	
	proc sql;
	create table finalini as 
	select distinct o.subjectid, 
					case when o.visitmnemonic eq 'CCRF' then 'Common' else o.visitmnemonic end as odb_visit, 
					o.formmnemonic as odb_form, 
				    o.formidx as odb_spid, itemsetidx as odb_add_spid, 
					case when o.formidx is null then '' else strip(put(o.formidx,10.)) || '('||strip(put(itemsetidx,10.))||')' end as odb_seq_dis,
					odb_name, odb_str_dt, odb_end_dt, dis_odb_end_dt, ae.aeseq, llt, ae_onsetdt
	  from odb_final o inner join sae ae
	    on o.subjectid = ae.subjectid
	  left join cm
		on cm.subjectid = o.subjectid
	   and upcase(strip(cm_cat)) = 'ONCOLOGIC'
       and upcase(strip(cm_sm)) = upcase(strip(odb_name))
       and cm_stdt = odb_str_dt
	 where odb_name is not null
  	   and ae_onsetdt is not null
  	   and upcase(strip(sae)) = 'YES'
  	   and case when (odb_end_dt lt ae_onsetdt - 14 or odb_str_dt gt ae_onsetdt + 14 ) then 0 else 1 end = 1
	   and cm.subjectid is null
	   ;
	quit;

	proc sort data = finalini;
		by subjectid;
	run;

	%subdataset(subject);	
	
	data final(keep = country sitenbr subjnbr odb_visit odb_form odb_spid odb_add_spid odb_seq_dis odb_name odb_str_dt dis_odb_end_dt aeseq llt ae_onsetdt);
		merge finalini(in=a) subject(in=b);
		by subjectid;
		if a and b;
	run;
		
	proc sort data = final;
		by country sitenbr subjnbr odb_visit odb_spid odb_add_spid aeseq odb_form;
	run;
%* --- 4. Generate output to Excel --- *;

	%obscnt(final);

	%if &nobs=0 %then %do; 

		ods tagsets.excelxp  
		%if &putfil=NON %then &putfilnm;  
			options ( embedded_titles        =  'yes'
					  embedded_footnotes     =  'yes'
					  print_footer           =  'Page &amp;P of &amp;N'
					  sheet_name             =  'onc_odb_010_jr_std'
					  orientation            =  'landscape'
					  absolute_column_width  =  '100');

		options formchar='|_' missing=' ' pageno=1 nobyline ls=160;

		title6	&titleformat "ODB Form: &odbformdis";

		data nobs;
			message = "No records meet the test condition";
		run;

		proc report data=nobs headline headskip spacing=1 split='*' missing
			style(report)={just=center font_face=times   font_size=1 cellspacing=2 borderwidth=2 background=white}
			style(header)={vjust=top   font_face=verdana font_size=2 font_weight=bold cellheight = 22 background=#7c98B0 
				foreground = white htmlstyle="text-align:center"}
			style(column)={just=center font_face=calibri font_size=2 background=white htmlstyle="text-align:center"};
			column message;
			define message	/ ' ';
		run;

	%end; /* End of &nobs=0 */

	%else %do;

		ods tagsets.excelxp
		%if &putfil=NON %then &putfilnm;  
			options ( embedded_titles        =  'yes'
					  embedded_footnotes     =  'yes'
					  print_footer           =  'Page &amp;P of &amp;N'
					  sheet_name             =  'onc_odb_010_jr_std'
					  orientation            =  'landscape'
					  absolute_column_width  =  '20,10,15,20,10,15,20,20,20,15,30,25');
				  
		options formchar='|_' missing=' ' pageno=1 nobyline ls=150;

		title6	&titleformat "ODB Form: &odbformdis";

		proc report data=final headline headskip spacing=1 split='*' missing
			style(report)={just=center font_face=times   font_size=1 cellspacing=2 borderwidth=2 background=white}
			style(header)={vjust=top   font_face=verdana font_size=2 font_weight=bold cellheight = 22 background=#7c98B0 
				foreground = white htmlstyle="text-align:center"}
			style(column)={just=center font_face=calibri background=white htmlstyle="text-align:center"};
		column country sitenbr subjnbr odb_visit odb_form odb_seq_dis odb_name odb_str_dt dis_odb_end_dt aeseq llt ae_onsetdt;
		define country			/ display   width=20 'Country'	flow;
		define sitenbr			/ display   width=10 'Site' style(column)={tagattr='format:@'};
		define subjnbr			/ display	width=15 'Subject Number' style(column)={tagattr='format:@'};
		define odb_visit	    / display	width=20 'ODB Visit' flow;
		define odb_form	        / display	width=10 'ODB Form' flow;
		define odb_seq_dis	    / display	width=15 'ODB Sequence' flow;
		define odb_name	        / display	width=20 'ODB Name' flow;
		define odb_str_dt 	    / display	width=20 'ODB Start Date' flow;
		define dis_odb_end_dt	/ display	width=20 'ODB Stop Date' flow;
		define aeseq 	        / display	width=15 'AE Sequence' flow;
		define llt	            / display	width=30 'AE Term' flow;
		define ae_onsetdt	    / display	width=25 'AE Onset Date and Time' flow;
		run;			

	%end; /* End of &nobs > 0 */

%let putfil=YES;
ods tagsets.excelxp close; 

%deletall;
run;

%mend onc_odb_010_jr_std;
