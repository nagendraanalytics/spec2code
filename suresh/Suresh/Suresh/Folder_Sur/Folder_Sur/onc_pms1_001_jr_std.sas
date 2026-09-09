%*************************************************************************************************;
%* Report Description:                                                                            ;
%* The report displays subjects who have started new anticancer therapy as reason for             ;
%* Discontinuation on any status form and no corresponded therapy form is present.                ;
%*************************************************************************************************;
%* Report Logic:                                                                                  ;
%* There is a "Status form" with "Itemmnemonic" = "Reason for Discontinuation"                    ;
%* AND There is no at least one record on the new anti cancer therapy form                        ;
%* Note 1: "Status form", "Itemmenocmic" (Status of Study Medication at the End of This Trial     ;
%* Segment, Status of Subject at End of This Trial Segment) and "Reason for discontinuation" are  ;
%* values from supporting document.                                                               ;
%* Note 2: ORAD2, OSOF, OSOFL, ODBF, ODBHF, ODBNF, ODBCF are the new anti cancer therapy forms,   ;
%* please take into account only the ones present in the protocol.                                ;
%* Note 3: Applicable ONLY when ORAD2 is the only eCRF completed and ODBF, ODBHF, ODBNF, ODBCF,   ;
%* OSOF are empty: If all records of reason for radiation in ORAD2 are selected as 'palliative    ;
%* treatment or Symptom Control' or 'palliative treatment or Symptom Control of metastatic        ;
%* disease' then output. If one record is palliative and the other is something different than    ;
%* palliative, then no output.                                                                    ;
%* Note 4: This report use supporting document.                                                   ;
%* If supporting doc is not provided, display the message as "ONC_PMS1_001_JR_STD Supporting      ;
%* Document Not Present for This Trial".                                                          ;
%* Requires supporting document to be named ONC_PMS1_001_supp_<MKxxxxxxx>.csv and will contain the;
%*  following columns and associated content:                                                     ;
%* 1. Status form   Required, enter PMS1/PMS1A/PMST/OEDRA                                         ;
%* 2. Itemmnemonic   Required, enter the corresponding question text that captures the reason why ;
%* subject completes PMS1/PMST/OEDRA/OEFU                                                         ;
%* 3. Reason for Discontinuation   Required, enter the actual reason that represents the subject  ;
%* is receiving a new anti cancer therapy                                                         ;
%* Eg.                                                                                            ;
%* Status form, Itemmnemonic, Reason for Discontinuation                                          ;
%* PMS1, Status of Study Medication at the End of This Trial Segment, Need for Excluded Medication;
%*  Discontinuation Criteria                                                                      ;
%* PMS1, Status of Study Medication at the End of This Trial Segment, New Non-Study Anti-Cancer   ;
%* Therapy                                                                                        ;
%* PMST, Status of Study Medication at the End of This Trial Segment, Need for Excluded Medication;
%*  Discontinuation Criteria                                                                      ;
%* The number of rows in the supporting document will be represented in the Report Header as "# of;
%*  rows for customization".                                                                      ;
%* The actual information provided by the supporting doc can be outputted by selecting Y in the   ;
%* parameter "Supporting doc Page".                                                               ;
%*************************************************************************************************;
%* Program Flow:                                                                                  ;
%* 1. Check the existance of supporting doc for ONC_PMS1_001_JR_STD                               ;
%* 2. Get information from supporting doc                                                         ;
%* 3. Get dataset for subject/dov form                                                            ;
%* 4. Based on study, get data from PMS Form                                                      ;
%* 5. Based on study, get data from ODB Form                                                      ;
%* 6. Final Dataset with subdataset filter                                                        ;
%* 7. Generate output to Excel                                                                    ;
%*************************************************************************************************;
%* Macros Used:                                                                                   ;
%* gdmsrpt_macros                                                                                 ;
%*************************************************************************************************;
%* Revision History:                                                                              ;
%* Version 1: Initial Version                                                                     ;
%* Version 2: New eCRF included (PMST)  [Dong, Lu Yao] 24/Aug/2020                                ;
%*************************************************************************************************;
*/
%macro onc_pms1_001_jr_std;

%let checkid = %upcase(onc_pms1_001_jr_std);
%let vernum = 2;
%let reptitle=NON-STUDY ANTI-CANCER THERAPY selected Vs Other treatment forms entries; 
%let repdesc=The report displays subjects who have started new anticancer therapy as reason for Discontinuation on any status form ;

%gdmsrptheader;
%orasetup;

footnote3 &footformat "and no corresponded therapy form is present.";

%* --- 1. Check the existance of supporting doc for ONC_PMS1_001_JR_STD --- *;

%if %sysfunc(fileexist(/cdm/prod/extfiles/Supp_Docs/ONC_PMS1_001_JR_STD/ONC_PMS1_001_supp_&prot..csv)) = 0 %then %do;

	title6	&titleformat "# of rows for Supporting Doc: &cnt_list";
	title7	&titleformat "Supporting Doc Page: &supppage";

	data _null_;
		file print;
		put #10 @10 "ONC_PMS1_001_JR_STD Supporting Document Not Present for This Trial";
		put #12 @10 "Please check the DRP for Details and Contact your RaM Programmer for Assistance";
	run;
	
%end;

%else %do;

%* --- 2. Get information from supporting doc  --- *;

	filename supp "/cdm/prod/extfiles/Supp_Docs/ONC_PMS1_001_JR_STD/ONC_PMS1_001_supp_&prot..csv";

	data onc_pms1_csv;
		format form $25. itemquestion $100. status $100. ;
		infile supp missover pad DSD delimiter = ',' firstobs=2;
		input form itemquestion status;
		if missing(_INFILE_) then delete;
	run;

	%supp(onc_pms1_csv);
	%obscnt(onc_pms1_csv);
	%let cnt_list = &nobs;
%* --- 3. Get dataset for subject/dov form  --- *;
	
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
	   
	   create table pms_all_dic as select * from connection to dbtest
	   		(
	    select distinct viewname, formrefname, itemrefname, columnname, itemquestion, columntype,
			   ctl0refname, ctl1refname, ctl2refname, ctl3refname 
		  from &protocol.&id2..cv_datadictionary 
		 where formrefname in ('PMS1FM','PMS1AFM','PMSTFM','OEDRAFM')
		   and upper(trim(itemrefname)) in ('PMS1DSDTCIT','PMS1ADSDTCIT','PMSTDSSTDTCIT','OEDRADSDTCIT') and columntype = 5  /*Date of Assessment*/
			or upper(trim(itemrefname)) in ('PMS1DSTERMSMCIT','PMS1ADSTERMSMCIT') and columntype = 17	/*Status of SM*/				
			or upper(trim(itemrefname)) in ('PMS1DSTERMSUBCIT','PMS1ADSTERMSUBCIT','PMSTDSATERMTSIT','OEDRADSATERMTSIT') and columntype = 17	/*Status of Subject*/			
		 order by itemrefname, columntype
	   		);	

		create table odb_all_dic as select * from connection to dbtest
	   		(
	    select distinct viewname, formrefname, itemrefname, columnname, itemquestion, columntype
			from &protocol.&id2..cv_datadictionary 
			where formrefname in ('ORAD2FM','OSOFFM','OSOFLFM','ODBFFM','ODBHFFM','ODBNFFM','ODBCFFM')
				   and upper(trim(columnname)) = 'FORMIDX' and viewname in ('CV_ORAD2FM','CV_OSOFFM','CV_OSOFLFM','CV_ODBFFM','CV_ODBHFFM','CV_ODBNFFM','CV_ODBCFFM')
				    or upper(trim(itemrefname)) in ('ORAD2PRINDCIT','ORAD2PRLNTHPYIT') and columntype = 17 /*Reason*/		
			order by itemrefname, columntype
	   		);	
	   disconnect from dbtest;
	quit;	
	
%* --- 4. Based on study, get data from PMS Form --- *;
proc sql;
create table pms1_dic as 
	select distinct viewname, itemquestion,
                    strip(status_column) || strip(pms_dt_column) as pms_column
		 from (
			   select p1.viewname, p1.itemquestion,
				      strip(p1.columnname) || ' as status, ' as status_column,
					  coalesce(strip(p2.columnname), 'null') || ' as pms_dt' as pms_dt_column
			     from (select * from pms_all_dic where upper(trim(itemquestion)) like 'STATUS%' and ctl2refname is not null and ctl3refname is null) p1
				 	   left join
				      (select viewname, formrefname, columnname from pms_all_dic where upper(trim(itemquestion)) like 'DATE%') p2
					   on p1.formrefname = p2.formrefname
             );
quit;

data _null_;
   set pms1_dic end = last;
      call symputx('viewname_'||left(_n_),strip(viewname));
	  call symputx('itemquestion_'||left(_n_),strip(itemquestion));
      call symputx('pms_column_'||left(_n_),strip(pms_column));
   if last then call symputx('pms_col_cnt',_n_);
run;

data pms (keep = subjectid formmnemonic visitid visitmnemonic pms_item status pms_dt);
	set dov(obs=0);
	formidx = visitid;
	formmnemonic = visitmnemonic;
	pms_item = visitmnemonic;
	status = visitmnemonic;
	pms_dt = dt_dov;
	format pms_dt datetime20.;
run;

%let i = 1;
%do i = 1 %to &pms_col_cnt;

proc sql;
connect to oracle as dbtest (user=PDAMREAD orapw="&orpass" path=&dbpth connection=global);

	create table pms_&i as select * from connection to dbtest
		     (
			  select subjectid, formmnemonic, visitid, visitmnemonic, 
			  	     %bquote('&&itemquestion_&i') as pms_item, &&pms_column_&i
			    from &protocol.&id2..&&viewname_&i
			  order by subjectid
		      );

	create table pms_supp_&i as
		     (
			  select p.*
			    from pms_&i p inner join onc_pms1_csv s
			      on upper(trim(p.formmnemonic)) = upper(trim(s.form))
			     and upper(trim(p.pms_item)) = upper(trim(s.itemquestion))
				 and upper(trim(p.status)) = upper(trim(s.status))
		      );
	disconnect from dbtest;
	quit;

	proc append base = pms data = pms_supp_&i force;
	run;

	proc delete data = pms_&i;
	run;

	proc delete data = pms_supp_&i;
	run;

%end;
%* --- 5. Based on study, get data from ODB Form --- *;
proc sql;
create table odb_dic as 
	select distinct viewname,
                    strip(formidx_column) || strip(reason_column) as odb_column
		 from (
			   select o1.viewname, 
				      strip(o1.columnname) || ' as formidx, ' as formidx_column,
					  coalesce(strip(o2.columnname), 'null') || ' as reason' as reason_column
			     from (select * from odb_all_dic where upper(trim(columnname)) = 'FORMIDX') o1
				 	   left join
				      (select viewname, formrefname, columnname from odb_all_dic where upper(trim(itemquestion)) like 'REASON%') o2
					   on o1.formrefname = o2.formrefname
             );
quit;

data _null_;
   set odb_dic end = last;
      call symputx('viewname_'||left(_n_),strip(viewname));
      call symputx('odb_column_'||left(_n_),strip(odb_column));
   if last then call symputx('odb_col_cnt',_n_);
run;

data odb (keep = subjectid formmnemonic formidx reason deletedform);
	set dov(obs=0);
	formidx = visitid;
	formmnemonic = visitmnemonic;
	reason = visitmnemonic;
	deletedform = visitmnemonic;
run;

%let i = 1;
%do i = 1 %to &odb_col_cnt;

proc sql;
connect to oracle as dbtest (user=PDAMREAD orapw="&orpass" path=&dbpth connection=global);

	create table odb_&i as select * from connection to dbtest
		     (select * from(select subjectid, formmnemonic, &&odb_column_&i, deletedform
			                  from &protocol.&id2..&&viewname_&i)
					  where nvl(deletedform, 'N') <> 'Y'
						and upper(nvl(reason,'null'))  not like 'PALLIATIVE%' 
			 		  order by subjectid
		      );
	disconnect from dbtest;
	quit;

	proc append base = odb data = odb_&i force;
	run;

	proc delete data = odb_&i;
	run;

%end;

%* --- 6. Final Dataset with subdataset filter  --- *;	
	proc sql;
	create table finalini as 
	select p.subjectid, p.visitid, p.visitmnemonic, p.formmnemonic, p.pms_dt, status
      from pms p left join dov d
	    on p.subjectid  = d.subjectid
	   and p.visitid  = d.visitid
     where p.subjectid is not null
  	   and err_visit is null
  	   and exists (select 1 from odb_all_dic)
       and not exists (select subjectid
					     from odb o
    					where p.subjectid  = o.subjectid);
	quit;

	%subdataset(subject);
	
	proc sort data = finalini;
		by subjectid;
	run;

	data final(keep = country sitenbr subjnbr visitid visitmnemonic formmnemonic dt_pms status);
		merge finalini(in=a) subject(in=b);
		by subjectid;
		if a and b;
		dt_pms = datepart(pms_dt);
		format dt_pms date9.;
	run;
		
	proc sort data = final nodupkey;
		by country sitenbr subjnbr visitid visitmnemonic formmnemonic dt_pms status;
	run;
	
%* --- 7. Generate output to Excel --- *;

	%obscnt(final);

	%if &nobs=0 %then %do; 

		ods tagsets.excelxp  
		%if &putfil=NON %then &putfilnm;  
			options ( embedded_titles        =  'yes'
					  embedded_footnotes     =  'yes'
					  print_footer           =  'Page &amp;P of &amp;N'
					  sheet_name             =  'onc_pms1_001_jr_std'
					  orientation            =  'landscape'
					  absolute_column_width  =  '100');

		options formchar='|_' missing=' ' pageno=1 nobyline ls=160;

		title6	&titleformat "# of rows for Supporting Doc: &cnt_list";
		title7	&titleformat "Supporting Doc Page: &supppage";

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
					  sheet_name             =  'onc_pms1_001_jr_std'
					  orientation            =  'landscape'
					  absolute_column_width  =  '20,10,15,20,10,10,50');
				  
		options formchar='|_' missing=' ' pageno=1 nobyline ls=150;

		title6	&titleformat "# of rows for Supporting Doc: &cnt_list";
		title7	&titleformat "Supporting Doc Page: &supppage";

		proc report data=final headline headskip spacing=1 split='*' missing
			style(report)={just=center font_face=times   font_size=1 cellspacing=2 borderwidth=2 background=white}
			style(header)={vjust=top   font_face=verdana font_size=2 font_weight=bold cellheight = 22 background=#7c98B0 
				foreground = white htmlstyle="text-align:center"}
			style(column)={just=center font_face=calibri background=white htmlstyle="text-align:center"};
		column country sitenbr subjnbr visitmnemonic formmnemonic dt_pms status;
		define country			/ display   width=20 'Country'	flow;
		define sitenbr			/ display   width=10 'Site' style(column)={tagattr='format:@'};
		define subjnbr			/ display	width=15 'Subject Number' style(column)={tagattr='format:@'};
		define visitmnemonic    / display   width=20 'Visit' flow;
		define formmnemonic     / display   width=10 'Form' flow;
		define dt_pms           / display   width=10 'Date of assessment' flow;
		define status           / display   width=50 'Status' flow;
		run;			

	%end; /* End of &nobs > 0 */

	%if &supppage = Y %then %do;

		ods tagsets.excelxp  
			options ( embedded_titles        =  'yes'
					  embedded_footnotes     =  'yes'
					  print_footer           =  'Page &amp;P of &amp;N'
					  sheet_name             =  'onc_pms1_001_jr_std_supp_doc'
					  orientation            =  'landscape'
					  absolute_column_width  =  '10,50,50');
					  
		data onc_pms1_csv;
			%if &cnt_list eq 0 %then %do;
				if _n_ = 1 then output;
				set onc_pms1_csv;
				output;
			%end;
			%else %do;
				set onc_pms1_csv;
			output;
			%end;
		run;
		
		options formchar='|_' missing=' ' pageno=1 nobyline ls=130;

		title6	&titleformat "# of rows for Supporting Doc: &cnt_list";
		title7	&titleformat "Supporting Doc Page: &supppage";

		proc report data=onc_pms1_csv headline headskip spacing=1 split='*' missing
			style(report)={just=center font_face=times   font_size=1 cellspacing=2 borderwidth=2 background=white}
			style(header)={vjust=top   font_face=verdana font_size=2 font_weight=bold cellheight = 22 background=#7c98B0 
				foreground = white htmlstyle="text-align:center"}
			style(column)={just=center font_face=calibri background=white htmlstyle="text-align:center"};
		column form itemquestion status;
		define form				/ display   width=10 'Status form';
		define itemquestion     / display   width=50 'Itemmnemonic' flow;
		define status           / display   width=50 'Reason for Discontinuation' flow;
		run;		

	%end; /* End of &supppage = Y */
	
%end; /* End of fileexist */

%let putfil=YES;
ods tagsets.excelxp close; 

%deletall;
run;

%mend onc_pms1_001_jr_std;
