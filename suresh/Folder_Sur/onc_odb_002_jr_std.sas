/*************************************************************************************************;

%* Report Description:                                                                            ;
%* This report lists subjects who have a Start Date of Regimen that is prior or equal to the Start;
%*  Date of Last Dose of Study Medication.                                                        ;
%*************************************************************************************************;
%* Report Logic:                                                                                  ;
%* Logic 1: SM/SM04/SMAB/SMAU/STR. Please Indicate if this is the Last Dose for this Label        ;
%* Description is selected                                                                        ;
%* AND                                                                                            ;                                                                                          ;
%* Logic 2: OSOF/OSOFL/ORAD2/ODBF/ODBCF/ODBHF/ODBNF.Start Date of Regimen OR minimum              ;
%* ODBF/ODBCF/ODBHF/ODBNF.Start Date of Medication <=  STR/SM/SM04/SMAB/SMAU. MAX Start Date/Time ;
%* of Logic 1                                                                                     ;
%* Note 1: Deleted records and erroneous visits should not be taken into account.                 ;
%* Note 2: Report should check minimum OSOF/OSOFL/ORAD2/ODBF/ODBCF/ODBHF/ODBNF.Start Date of      ;
%* Medication within formidx.                                                                     ;
%* Note 3:  For ODBF/ODBCF/ODBHF/ODBNF, if "Start Date of Regimen" exists, then use "Start Date of;
%*  Regimen"; if not, use "Start Date of Medication". For ORAD2, use Start Date of Medication,".  ;
%* For OSOF/OSOFL, use Date of Assessment /Date Performed/ Date and Time Performed/Date of Surgery;
%*   per study design.                                                                            ;
%* Note 4: Please ignore time for logic2, use "Imputed Start Date of Regimen" or "Imputed Start   ;
%* Date of Medication"  for ODBF/ODBCF/ODBHF/ODBNF/ORAD2/OSOF/OSOFL                               ;
%* Note 5: Hardcode ORAD2.Start Date as below: Month UNK: Jan Day UNK: 01                         ;
%* Note 6: Hardcode OSOF.Date and Time Performed  as below: Month UNK: Jan Day UNK: 01            ;
%*************************************************************************************************;
%* Program Flow:                                                                                  ;
%* 1. Get dataset for subject/dov/odb_dic/sm_dic form                                             ;
%* 2. Based on study, get subjectid, formindex from ODB Form                                      ;
%* 3. Based on study, get Date from ODB Form and ODB Add Entry Form                               ;
%* 4. Get dataset of SM related Forms based on study design                                       ;
%* 5. Final Dataset with subdataset filter                                                        ;
%* 6. Generate output to Excel                                                                    ;
%*************************************************************************************************;
%* Macros Used:                                                                                   ;
%* gdmsrpt_macros                                                                                 ;
%*************************************************************************************************;
%* Revision History:                                                                              ;
%* Version 1 - Initial version Version                                                            ;
%* Version 2 - ORAD2 and STR forms added to logic  [Dong, Lu Yao] 24/Aug/2020                     ;
%* Version 3 - OSOF and OSOFL forms added to logic [Dong, Lu Yao] 24/Aug/2020                     ;
%* Version 4 - Column Heading added 10. eCRF Name, Parameter Selection added eCRF Name(s)         ;
%*             [Sun, Tian le] 18/MAY/2023                                                         ;
%*  Version 5 - Code update to fix migration issue  [Sun, Tian le] 9/Dec/2024			  ; 
%*************************************************************************************************;
*/
%macro onc_odb_002_jr_std;

%let checkid = %upcase(onc_odb_002_jr_std);
%let vernum = 5;
%let reptitle=Study Medication Last Dose Date vs Start Date of Oncologic Regimen; 
%let repdesc=This report lists subjects who have a Start Date of Regimen that is prior or equal to the Start Date of
Last Dose of Study Medication.;

%gdmsrptheader;
%orasetup;

%* --- 1. Get dataset for subject/dov/odb_dic/sm_dic form, --- *;

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
	    select subjectid, visitid, visitmnemonic, dt_dov, dovserrorvcb_dovserrorvsc__1 as err_visit from &protocol&id2..cv_dovfm
		 where 1 = 1 order by subjectid, visitid
	   );

   create table odb_all_dic as select * from connection to dbtest
	   (
	    select distinct formrefname, viewname, itemrefname, childitemrefname, columnname, itemquestion, sectionorder, columntype
			from &protocol.&id2..cv_datadictionary 
			where formrefname in ('ODBFFM','ODBCFFM','ODBHFFM','ODBNFFM','ORAD2FM','OSOFFM','OSOFLFM') 
            and (upper(trim(itemrefname)) in ('ODBFCMSTDTIIT','ODCFCMSTDTIIT','ODBHFCMSTDTIIT','ODBNFCMSTDTIIT','ORAD2PRSTDTCIT','OSOFLPRDTCIT','OSOFLPRSTDTCIT','OSOFPRASMTDTCIT','OSOFPRDTCIT','OSOFPRSTDTCIT')
			 or upper(trim(childitemrefname)) in ('ODBFCMSTDTIIT','ODBFCMSTINMDTIIT','ODCFCMSTINMDTIIT','ODBHFCMSTDTIIT','ODBHFCMSTINMDIIT','ODBNFCMSTDTIIT','ODBNFCMSTINMDTIIT'))
			and columntype in (5,7,17)
			and SECTIONORDER <> 0
			order by formrefname, viewname, sectionorder, itemquestion, columntype
	   );

	create table odb_table_dic as select * from connection to dbtest
	   (
	    select distinct viewname
            from &protocol.&id2..cv_datadictionary 
			where viewname in ('CV_ODBFFM','CV_ODBCFFM','CV_ODBHFFM','CV_ODBNFFM','CV_ORAD2FM','CV_OSOFFM','CV_OSOFLFM') 
	   );

   create table sm_all_dic as select * from connection to dbtest
	   (
	    select distinct formrefname, viewname, itemrefname, columnname, itemquestion, sectionorder, columntype 
			from &protocol&id2..cv_datadictionary 
			where formrefname in ('SMFM','SMAUFM','SMABFM','SM04FM','STRFM')
			and (upper(trim(itemrefname)) in ('SMEXSTDTCIT','SMAUEXSTDTCIT','SMABEXSTDTCIT','STREXSTDTCIT')/*Start Date*/
			 or upper(trim(itemrefname)) like 'SM04EXSTDTC%IT'
			 or upper(trim(itemrefname)) in ('SMEXLDINDCIT','SMAUEXLDINDCIT','SMABEXLDINDCIT','STREXLDINDCIT')) /*Last Dose*/
			and columntype in (5,17)
	   );

   disconnect from dbtest;
quit;

%* --- 2. Based on study, get subjectid, formindex from ODB Form --- *;
data _null_;
	set odb_table_dic end = last;
	    call symputx('odb_table_'||left(_n_),strip(viewname));
    if last then call symputx('odb_table_cnt',_n_);
run;

data odbfm_main (keep = subjectid formmnemonic formindex formidx);
	set dov(obs=0);
	formmnemonic = visitmnemonic;
	formindex = visitid;
	formidx = visitid;
run;

/*%macro test1;*/
	%let i = 1;
	%do i = 1 %to &odb_table_cnt;

		proc sql;
		   connect to oracle as dbtest (user=PDAMREAD orapw="&orpass" path=&dbpth connection=global);

		   create table odb_main_&i as select * from connection to dbtest
		      (
					select subjectid, formmnemonic, formindex, formidx, deletedform
					from &protocol.&id2..&&odb_table_&i
					order by subjectid, formindex 
		      );
		quit;

		data odb_main(drop = deletedform);
			set odb_main_&i;
			by subjectid;
			if missing(deletedform) or deletedform = 'N';
		run;

		proc append base = odbfm_main data = odb_main force;
		run;

		proc delete data = odb_main_&i;
		run;


	%end;
/*%mend;*/
/*%test1;*/
%* --- 3. Based on study, get Date from ODB Form and ODB Add Entry Form--- *;
proc sql;
    create table odb_count as
    select *,count(distinct columnname) as odb_count from odb_all_dic
    group by formrefname;
quit;

%supp(odb_count);

data odb_count_f;
  set odb_count;
  if formrefname in ('ORAD2FM','OSOFFM','OSOFLFM')
  or formrefname in ('ODBFFM','ODBCFFM','ODBHFFM','ODBNFFM') and odb_count=2 and itemquestion = 'IMPUTED START DATE OF REGIMEN'
  or formrefname in ('ODBFFM','ODBCFFM','ODBHFFM','ODBNFFM') and odb_count=1 and itemquestion = 'IMPUTED START DATE OF REGIMEN'
  or formrefname in ('ODBFFM','ODBCFFM','ODBHFFM','ODBNFFM') and odb_count=1 and itemquestion = 'IMPUTED START DATE OF MEDICATION';
  form = substr(formrefname,1, length(formrefname)-2);
run;

proc sql;
create table odb_dic as 
	select distinct viewname, itemquestion, strip(odb_dt_column) || strip(odb_dts_column) as odb_column,
		   case when upper(trim(viewname)) in ('CV_ODBFFM','CV_ODBCFFM','CV_ODBHFFM','CV_ODBNFFM','CV_ORAD2FM','CV_OSOFFM','CV_OSOFLFM') then 'FORMIDX, DELETEDFORM, 0 AS ITEMSETIDX, NULL AS DELETEDITEM' 
				else 'FORMIDX, DELETEDFORM, ITEMSETIDX, DELETEDITEM' end as columnlist
		 from (
			   select o1.viewname, o1.itemquestion, 
				      strip(o1.columnname) || ' as odb_dt, ' as odb_dt_column,
					  case when upper(trim(o1.viewname)) not in ('CV_OSOFFM','CV_OSOFLFM') then coalesce(strip(o2.columnname), 'null') || ' as odb_dts ' 
						   when upper(trim(o1.viewname)) in ('CV_OSOFFM','CV_OSOFLFM') and upper(trim(o1.itemquestion)) like '%TIME%' then coalesce(strip(o2.columnname), 'null') || ' as odb_dts ' 
						   else 'null as odb_dts ' end as odb_dts_column
			     from (select * from odb_count_f where upcase(strip(columnname)) like 'DT_O%') o1
				 	   left join
				      (select viewname, columnname from odb_count_f where upcase(strip(columnname)) like 'DTS_O%') o2
					   on o1.viewname = o2.viewname
             );
quit;

data _null_;
	set odb_dic end = last;
	    call symputx('odb_viewname_'||left(_n_),strip(viewname));
	    call symputx('odb_colname_'||left(_n_),strip(upcase(odb_column)));
		call symputx('odb_collist_'||left(_n_),strip(upcase(columnlist)));
		call symputx('itemquestion_'||left(_n_),strip(itemquestion));
    if last then call symputx('odb_col_cnt',_n_);
run;

data odbfm (keep = subjectid formmnemonic formindex formidx itemsetidx odb_dt odb_dts odb_item);
	set dov(obs=0);
	formmnemonic = visitmnemonic;
	formindex = visitid;
	formidx = visitid;
	itemsetidx = visitid;
	odb_dt = dt_dov;
	odb_dts = visitmnemonic;
	odb_item = visitmnemonic;
	format odb_dt datetime20.;
run;

/*%macro test2;*/
	%let i = 1;
	%do i = 1 %to &odb_col_cnt;

		proc sql;
		   connect to oracle as dbtest (user=PDAMREAD orapw="&orpass" path=&dbpth connection=global);

		   create table odb_&i as select * from connection to dbtest
		      (
					select subjectid, formmnemonic, formindex, %bquote('&&itemquestion_&i') as odb_item,
						&&odb_colname_&i, &&odb_collist_&i
					from &protocol.&id2..&&odb_viewname_&i
					order by subjectid, formindex 
		      );
		quit;

		data odb (drop = deletedform deleteditem);
			set odb_&i;
			by subjectid;
			if missing(deletedform) or deletedform = 'N';
			if missing(deleteditem) or deleteditem = 'N';
			if not missing(odb_dts) or not missing(odb_dt);
		run;

		proc append base = odbfm data = odb force;
		run;

		proc delete data = odb_&i;
		run;


	%end;
/*%mend;*/
/*%test2;*/

data odbfm (keep = subjectid formmnemonic formindex formidx itemsetidx odb_dt odb_dts odb_dt_c odb_dt_dis odb_item);
length odb_dt_dis $15.;
 	 set odbfm;
	 if find(odb_dts,'UNK')=0 then odb_dt_c = datepart(odb_dt); 
	 if find(odb_dts,'UNK')=0 then odb_dt_dis = put(datepart(odb_dt), yymmdd10.);
	 if find(odb_dts,'UNK')>0 then odb_dt_c = input(tranwrd(tranwrd(odb_dts,'/','-'),'UNK','01'),yymmdd10.);
	 if find(odb_dts,'UNK')>0 then odb_dt_dis = tranwrd(odb_dts,'/','-');
     format odb_dt_c date9. ;
run;

proc sql;
	create table odb_all as
		select distinct odbfm_main.subjectid, odbfm_main.formmnemonic, odbfm_main.formindex, odbfm_main.formidx, 
			odbfm.itemsetidx, odbfm.odb_dt, odbfm.odb_dts, odbfm.odb_dt_c, odbfm.odb_dt_dis
		from odbfm left join odbfm_main
		on odbfm.subjectid = odbfm_main.subjectid
		and odbfm.formmnemonic = odbfm_main.formmnemonic
		and odbfm.formindex = odbfm_main.formindex
        order by subjectid, formmnemonic, formindex;
quit;


data odb_all;
set odb_all;
%if %length(&odbform) gt 0 %then %do;
%let odbformdis = %sysfunc(upcase(&odbform));
%let odbformlist = %sysfunc(catq(1ac,&odbformdis));
where formmnemonic in (&odbformlist);
%end;
%else %do;
%let odbformdis = All;
%end;
run;



proc sort data = odb_all nodupkey;
	by subjectid formmnemonic formidx odb_dt odb_dts odb_dt_c odb_dt_dis;
run;

data odbfm_min(keep= subjectid formmnemonic formindex formidx odb_dt odb_dts odb_dt_c odb_dt_dis);
	set odb_all;
	by subjectid formmnemonic formidx;
	if first.formidx;
	if not missing(odb_dt_c);
run;

%* --- 4. Get dataset of SM related Forms based on study design  --- *;
proc sql;
	create table sm_dic as 
		select distinct viewname, strip(sm_start_dt_column) || strip(sm_dose_column) as sm_column
		from (
			select sm1.viewname, sm1.sectionorder,
				strip(sm1.columnname) || ' as dt_start_sm, ' as sm_start_dt_column,
				coalesce(strip(s1.columnname), 'null') || ' as last_dose ' as sm_dose_column
			from 
			(select * from sm_all_dic where upper(trim(itemquestion)) like 'START DATE%') sm1
			left join 
			(select viewname, sectionorder, columnname from sm_all_dic 
				where upper(trim(itemquestion)) like '%LAST DOSE%') s1
				on sm1.viewname = s1.viewname
				and sm1.sectionorder = s1.sectionorder
		);
quit;

data smfm (keep = subjectid visitid visitmnemonic formmnemonic formidx dt_start_sm last_dose);
	set dov(obs=0);
	formmnemonic = visitmnemonic;
	formidx = visitid;
	dt_start_sm = dt_dov;
	last_dose = visitmnemonic;
	format dt_start_sm datetime20.;
run;

data _null_;
	 set sm_dic end = last;
	    call symputx('sm_viewname_'||left(_n_),strip(viewname));
	    call symputx('sm_column_'||left(_n_),strip(sm_column));
	    if last then call symputx('sm_col_cnt',_n_);
run;

/*%macro test3;*/
%let i = 1;
%do i = 1 %to &sm_col_cnt;

	%if %bquote('&&sm_viewname_&i') ='CV_SM04FM' %then %do;
		proc sql;
		   connect to oracle as dbtest (user=PDAMREAD orapw="&orpass" path=&dbpth connection=global);

		   create table sm as select * from connection to dbtest
		      (
				select subjectid, visitid, visitmnemonic, formmnemonic, formidx, dt_start_sm, last_dose
 
				from (
					select subjectid, visitid, visitmnemonic, formmnemonic, 1 as formidx, 
						&&sm_column_&i, 'N' as deletedform
						from &protocol.&id2..&&sm_viewname_&i
							) 
					where coalesce(deletedform, 'N') <> 'Y'
					order by subjectid, visitid, formidx
			      );
		quit;
	%end;

	%else %do;
		proc sql;
			 connect to oracle as dbtest (user=PDAMREAD orapw="&orpass" path=&dbpth connection=global);

			 create table sm as select * from connection to dbtest
			    (
				select subjectid, visitid, visitmnemonic, formmnemonic, formidx, dt_start_sm, last_dose
 
				from (
					select subjectid, visitid, visitmnemonic, formmnemonic, formidx, 
						&&sm_column_&i, deletedform
						from &protocol.&id2..&&sm_viewname_&i
							) 
					where coalesce(deletedform, 'N') <> 'Y'
					order by subjectid, visitid, formidx
			      );
		quit;
	%end;

		data sm (drop = dt_dov err_visit);
			merge sm(in=a) dov(in=b);
			by subjectid visitid;
			if a and missing(err_visit);
			if not missing(dt_start_sm);
			if formmnemonic in ('SM','SMAB','SMAU','STR') and not missing(last_dose)
			or formmnemonic in ('SM04');
		run;

		proc append base = smfm data = sm force;
		run;

%end;
/*%mend;*/
/*%test3;*/

proc sort data = smfm;
	by subjectid dt_start_sm visitid formidx;
run;

data sm_max (keep = subjectid formmnemonic formidx visitmnemonic dt_sm);
    set smfm;
    by subjectid;
    if last.subjectid;
    dt_sm = datepart(dt_start_sm);
    format dt_sm date9.;
run;

data sm_max (keep = subjectid formmnemonic formidx visitmnemonic dt_sm dt_sm_dis);
    set sm_max;
	dt_sm_dis = put(dt_sm, yymmdd10.);
run;

%* --- 5. Final Dataset with subdataset filter  --- *;

	%subdataset(subject);

	proc sql;
		create table odb_sm as 
		select distinct odb.subjectid, sm.formmnemonic as sm_form, sm.formidx as sm_formidx, 
			   case when sm.visitmnemonic='CCRF' then 'Common' else sm.visitmnemonic end as visitmnemonic, 
               dt_sm, dt_sm_dis, odb.formmnemonic as odb_form, odb.formidx as odb_formidx, odb_dt, odb_dts, odb_dt_c, odb_dt_dis
			from sm_max sm inner join odbfm_min odb
			on sm.subjectid = odb.subjectid
			where odb_dt_c le dt_sm
            order by subjectid;
	quit;

	data final;
		merge odb_sm(in=a) subject(in=b);
		by subjectid;
		if a and b;
	run;
		
	proc sort data = final nodupkey;
		by country sitenbr subjnbr odb_formidx odb_dt_c visitmnemonic sm_form sm_formidx dt_sm dt_sm_dis odb_dt_dis;
	run;


%* --- 6. Generate output to Excel --- *;
%obscnt(final);
	%if &nobs=0 %then %do; 

		ods tagsets.excelxp  
		%if &putfil=NON %then &putfilnm;  
			options ( embedded_titles        =  'yes'
					  embedded_footnotes     =  'yes'
					  print_footer           =  'Page &amp;P of &amp;N'
					  sheet_name             =  'onc_odb_002_jr_std'
					  orientation            =  'landscape'
					  absolute_column_width  =  '100');

		options formchar='|_' missing=' ' pageno=1 nobyline ls=160;

			    title5  &titleformat "eCRF Name(s) : &odbformdis";

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
                  sheet_name             =  'onc_odb_002_jr_std'
                  orientation            =  'landscape'
                  absolute_column_width  =  '20,10,15,25,10,10,20,20,25,15');
				  
		options formchar='|_' missing=' ' pageno=1 nobyline ls=175;

                                               	    title5  &titleformat "eCRF Name(s) : &odbformdis";


	proc report data=final headline headskip spacing=1 split='*' missing
		style(report)={just=center font_face=times   font_size=1 cellspacing=2 borderwidth=2 background=white}
		style(header)={vjust=top   font_face=verdana font_size=2 font_weight=bold cellheight = 22 background=#7c98B0 
			foreground = white htmlstyle="text-align:center"}
		style(column)={just=center font_face=calibri background=white htmlstyle="text-align:center"};
	column country sitenbr subjnbr visitmnemonic sm_form sm_formidx dt_sm_dis odb_formidx odb_dt_dis odb_form;
	define country			    / display   width=20 'Country'	flow;
	define sitenbr              / display   width=10 'Site' style(column)={tagattr='format:@'};
	define subjnbr              / display	width=15 'Subject Number' style(column)={tagattr='format:@'};
	define visitmnemonic		/ display	width=25 'Visit Mnemonic' flow; 
	define sm_form		        / display	width=10 'SM Form';
	define sm_formidx	        / display	width=10 'SM Seq';
	define dt_sm_dis		    / display	width=20 'Last Dose Date';
	define odb_formidx	        / display	width=20 'New Treatment Seq';
	define odb_dt_dis		    / display	width=25 'New treatment Start Date';
	define odb_form		        / display	width=10 'eCRF Name';



	run;			

	%end; /* End of &nobs > 0 */

%let putfil=YES;
ods tagsets.excelxp close; 

%deletall;
run;

%mend onc_odb_002_jr_std;
