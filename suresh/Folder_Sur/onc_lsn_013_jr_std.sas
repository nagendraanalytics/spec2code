/*************************************************************************************************;
%*************************************************************************************************;
%* Report Description:                                                                            ;
%* This report lists subjects where there is a mismatch between date reported in the lesion       ;
%* evaluation section and the minimum date at the evaluation entry section for the same lesion.   ;
%*************************************************************************************************;
%* Report Logic:                                                                                  ;
%* "DATE OF INITIAL IDENTIFICATION" <> the earliest "DATE OF LESION EVALUATION" per LSN seq       ;
%* Notes:                                                                                         ;
%* Note 1: Report should not display deleted records.                                             ;
%* Note 2: This report uses the master LSN_supp_doc.csv. This supporting document should be       ;
%* uploaded only once at TA level per the GDO Oncology TAST authorized members and will be used to;
%*  facilitate programming of the report. Report builder will use all the columns provided in the ;
%* excel spreadsheet to create the programming code.                                              ;
%* Note 3: The items "DATE OF INITIAL IDENTIFICATION" and "DATE OF LESION EVALUATION" should be   ;
%* used from master LSN_supp_doc.csv.                                                             ;
%*************************************************************************************************;
%* Program Flow:                                                                                  ;
%* 1. Get information from supporting doc                                                         ;
%* 2. Manage itemquestion according to spec and forms based on study                              ;
%* 3. Final Dataset with subdataset filter                                                        ;
%* 4. Generate output to Excel                                                                    ;
%*************************************************************************************************;
%* Macros Used:                                                                                   ;
%* gdmsrpt_macros                                                                                 ;
%*************************************************************************************************;
%* Revision History:                                                                              ;
%* Version 1   Initial version                                                                    ;
%* Version 2   Code update to fix programming issue.                                              ;
%* Version 3 - Programming update                                                                 ;
%* Version 4   Programming update to include the master LSN_supp_doc.csv                          ;
%* [Dong, Lu Yao - 26/Aug/2021]                                                                   ;
%*************************************************************************************************;
*/

%macro onc_lsn_013_jr_std;

%let checkid = %upcase(onc_lsn_013_jr_std);
%let vernum = 1;
%let reptitle=Date mismatch between lesion evaluation section and baseline lesion evaluation at entry section; 
%let repdesc=This report lists subjects where there is a mismatch between date reported in the lesion evaluation section and the minimum date;

%gdmsrptheader;
%orasetup;

footnote3 &footformat " at the evaluation entry section for the same lesion.";

%* --- 1. Get information from supporting doc  --- *;

	%* --- 1.1.2 Global supporting document --- *;
	filename supp "/cdm/prod/extfiles/Supp_Docs/OTHER_GLOBAL_SUPP/LSN_supp_doc.csv";
/*	filename supp "C:\Users\dongluy\Downloads\Supp_Docs\LSN_supp_doc.csv";*/

	data g_lsn_supp;
		format viewname $50. original_itemquestion $200. itemquestion $200. controllevel $10. columnname $200. prefix $10.;
		infile supp missover pad DSD delimiter = ',' firstobs=2;
		input viewname original_itemquestion itemquestion controllevel columnname prefix;
		if missing(_INFILE_) then delete;
	run;

	data global_supp;
		format formname $50. viewname $50. original_itemquestion $200. itemquestion $200. controllevel $10. columnname $200. prefix $10.;
		set g_lsn_supp;
		formname=substr(viewname,4,find(cats(viewname,'_'),'_',4)-4);
	run;

	%supp(global_supp);
	%obscnt(global_supp);
	%let gcnt_list = &nobs;

%* --- 2. Manage itemquestion according to spec and forms based on study ---*;
	%* --- 2.1 get rd_datadictionary and define form/item based on study ---*;
	proc sql noprint;
	    connect to oracle as dbtest
	    (user=PDAMREAD orapw="&orpass" path=&dbpth connection=global);

	    create table subject as select * from connection to dbtest
	      (
	       select a.subjectid, b.sitecountry as country, b.sitemnemonic as sitenbr, 
		 		  a.subjectnumberstr as subjnbr, b.sascorressnumit as screennbr
	         from &protocol.&id2..irv_cur_subject a, &protocol&id2..cv_safm b
	        where a.subjectid = b.subjectid
	        order by a.subjectid
	       );

	    create table dov as select * from connection to dbtest
		    (
		     select subjectid, visitid, visitmnemonic, dt_dov, dovserrorvcb_dovserrorvsc__1 as err_visit 
			 	from &protocol&id2..cv_dovfm
			  where 1 = 1 order by subjectid, visitid
		    );

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
			   and s.original_itemquestion=upper(strip(r.itemquestion))
			 order by s.viewname, s.itemquestion;

	    disconnect from dbtest;
	quit;

	%* --- 2.2 Programmer Action Needed: Assign form/item alias based on itemquestion and form based on report design ---*;
	data study_supp_alias (keep=formname viewname columnname item_alias form_alias mformidx mdeletedform aitemsetidx adeletedform adeleteditem);
		set studyfm;
		format item_alias $50. form_alias $50.;
 		if upcase(compbl(itemquestion)) in ('DATE OF INITIAL IDENTIFICATION') and prefix='DT' and controllevel = 1 then do;
	         item_alias = 'maindt';
			 form_alias = 'lsn';
	    end;
		else if upcase(compbl(itemquestion)) in ('DATE OF LESION EVALUATION') and prefix='DT' and controllevel = 1 then do;
			item_alias = 'adddt';
			form_alias = 'lsn';
		end;
		if not missing(item_alias);
	run;

	%* --- 2.3 Proceed item variation ---*;
	proc sort data=study_supp_alias;
		by form_alias formname viewname item_alias;
	run;

	data dic_vary;
		set study_supp_alias;
		by form_alias formname viewname item_alias;
		format varycom $4000.;
		retain varycom;
		if first.item_alias then do;
			varycom = strip(columnname);
	    end;
		else do;
			varycom = 'NVL(' || strip(varycom) || ',' || strip(columnname) || ')';
		end;
		if last.item_alias then output;
	run;

	data dic_all (keep=form_alias formname viewname columnlst mformidx mdeletedform aitemsetidx adeletedform adeleteditem item item_add);
		set dic_vary;
		by form_alias formname;
		format columnlst $4000.;
		retain columnlst;
		if first.formname then do;
			columnlst='m.subjectid,m.visitid,m.visitmnemonic,m.formid,m.formmnemonic';
		end;
		columnlst = catx(',',columnlst,cat(strip(varycom),' as ', strip(item_alias)));
		if last.formname then output;
	run;

	data _null_;
		set dic_all end=eof;
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

    %* --- 2.4 Get Study form data based on report design ---*;
	data lsn_0;
		format subjectid best12. visitid best12. visitmnemonic $100. formid best12. formmnemonic $100. formidx_m best12. itemsetidx_a best12. 
               maindt datetime20. adddt datetime20.;
		stop;
	run;

	%macro movetable(table);
		proc delete data=&table;
		run;
	%mend;

	%macro gdataset;
	%GLOBAL lsnformdis;
	%if &dic_cnt>0 %then %do; 
		proc sql;
			connect to oracle as dbtest (user=PDAMREAD orapw="&orpass" path=&dbpth connection=global);

			%do i = 1 %to &ecrf_nbr;
				%if &&viewmain&i ne &&viewadd&i %then %do;
					create table &&formalias&i.._&i as select * from connection to dbtest
					(select v.* from
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
						(select &&columnlst&i,FORMIDX_m,0 as ITEMSETIDX_a
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

		data lsn;
			set lsn_:;
			%if %length(&lsnform) gt 0  %then %do;
			    %let lsnformdis = %sysfunc(upcase(&lsnform));
				%let lsnformlist = %sysfunc(catq(1ac,&lsnformdis));
				where formmnemonic in (&lsnformlist);
			%end;
			%else %do;
				%let lsnformdis = All;
            %end;	
		run;

    %end;

	%do i = 0 %to &ecrf_nbr;
		%movetable(lsn_&i);
	%end;

	%mend;
	%gdataset;

	data lsn (keep = subjectid visitid visitmnemonic formmnemonic formidx_m itemsetidx_a mian_dt add_dt);
 	 set lsn;
	 mian_dt = datepart(maindt);
	 add_dt = datepart(adddt);
     format mian_dt date9. add_dt date9.;
	 if not missing(maindt);
	 if not missing(adddt);
	run;	


%* --- 3. Final Dataset with subdataset filter  --- *;	
	proc sort data = lsn;
		by subjectid formmnemonic formidx_m add_dt;
	run;

	data lsn_min(keep= subjectid visitid visitmnemonic formmnemonic formidx_m itemsetidx_a mian_dt add_dt);
		set lsn;
		by subjectid formmnemonic formidx_m;
		if first.formidx_m;
	run;

	proc sql;
	create table lsn_item as 
	select subjectid, formmnemonic, formidx_m, itemsetidx_a, mian_dt, add_dt, itemquestion, original_itemquestion
	  from lsn_min l, studyfm s
	 where upcase(strip(formmnemonic)) = tranwrd(upcase(strip(formname)),'FM','')
	   and mian_dt ne add_dt
	   and upcase(strip(itemquestion)) in ('DATE OF INITIAL IDENTIFICATION','DATE OF LESION EVALUATION')
	   ;

	create table finalini as 
	select distinct l1.subjectid, l1.formmnemonic, l1.formidx_m, l1.itemsetidx_a, l1.mian_dt, l1.add_dt, 
		   l1.original_itemquestion as item, l2.original_itemquestion as item_add
	  from lsn_item l1, lsn_item l2
	 where l1.subjectid = l2.subjectid
	   and l1.formmnemonic = l2.formmnemonic
	   and l1.formidx_m = l2.formidx_m
       and upcase(strip(l1.itemquestion)) = 'DATE OF INITIAL IDENTIFICATION'
	   and upcase(strip(l2.itemquestion)) = 'DATE OF LESION EVALUATION'
	   ;
	quit;

	%subdataset(subject);

	proc sort data=finalini;
		by subjectid;
	run;	
	
	data final;
		merge finalini(in=a) subject(in=b);
		by subjectid;
		if a and b;
	run;
	
	proc sort data = final nodupkey;
		by country sitenbr subjnbr formmnemonic formidx_m item mian_dt itemsetidx_a item_add add_dt;
	run;

%* --- 4. Generate output to Excel --- *;

	%obscnt(final);

	%if &nobs=0 %then %do; 

		ods tagsets.excelxp  
		%if &putfil=NON %then &putfilnm;  
			options ( embedded_titles        =  'yes'
					  embedded_footnotes     =  'yes'
					  print_footer           =  'Page &amp;P of &amp;N'
					  sheet_name             =  'onc_lsn_013_jr_std'
					  orientation            =  'landscape'
					  absolute_column_width  =  '100');

		options formchar='|_' missing=' ' pageno=1 nobyline ls=160;

		title6	&titleformat "LSN Form: &lsnformdis";

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
					  sheet_name             =  'onc_lsn_013_jr_std'
					  orientation            =  'landscape'
					  absolute_column_width  =  '20,10,15,20,15,25,15,15,25,15');
				  
		options formchar='|_' missing=' ' pageno=1 nobyline ls=200;

		title6	&titleformat "LSN Form: &lsnformdis";

		proc report data=final headline headskip spacing=1 split='*' missing
			style(report)={just=center font_face=times   font_size=1 cellspacing=2 borderwidth=2 background=white}
			style(header)={vjust=top   font_face=verdana font_size=2 font_weight=bold cellheight = 22 background=#7c98B0 
				foreground = white htmlstyle="text-align:center"}
			style(column)={just=center font_face=calibri background=white htmlstyle="text-align:center"};
		column country sitenbr subjnbr formmnemonic formidx_m item mian_dt itemsetidx_a item_add add_dt;
		define country			/ display   width=20 'Country'	flow;
		define sitenbr			/ display   width=10 'Site' style(column)={tagattr='format:@'};
		define subjnbr			/ display	width=15 'Subject Number' style(column)={tagattr='format:@'};
		define formmnemonic		/ display	width=20 'Lesion Evaluation Form';
		define formidx_m		/ display	width=15 'Seq #';
		define item		        / display	width=25 'Name of item on Lesion Evaluation Form' flow;
		define mian_dt			/ display	width=15 'Date' ;
		define itemsetidx_a		/ display	width=15 'Seq # Add Entry';
		define item_add			/ display	width=25 'Name of item on Lesion Evaluation Form' flow;
		define add_dt			/ display	width=15 'Earliest Date';
		run;			

	%end; /* End of &nobs > 0 */

%let putfil=YES;
ods tagsets.excelxp close; 

%deletall;
run;

%mend onc_lsn_013_jr_std;
