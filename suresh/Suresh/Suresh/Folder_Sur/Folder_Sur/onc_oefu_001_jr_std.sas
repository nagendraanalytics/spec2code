/*************************************************************************************************;

%* Report Description:                                                                            ;
%* This report will output subjects who have Progressive Disease in the lesion response form      ;
%* during follow up phase but no OEFU/OEDRA is provided.                                          ;
%*************************************************************************************************;
%* Report Logic:                                                                                  ;
%* Logic 1: There is at least one [ONCOLOGIC RESPONSE FORM].OVERALL RESPONSE/RESPONSE/HEMATOLOGIC ;
%* RESPONSE/OVERALL IRECIST RESPONSE/OVERALL RECIST RESPONSE/OVERALL IRRECIST RESPONSE/           ;
%* PET RESPONSE =  Progressive Disease  or  iCPD  or  irProgressive Disease  OR                   ;
%* ORAJ.Disease Recurrence Indicator =  Yes                                                       ;
%* AND                                                                                            ;
%* Logic 2: There is at least one [PMS Form]. Date of Assessment < [ONCOLOGIC RESPONSE FORM].DATE ;
%* RESPONSE DETERMINED/ ORAJ.Date of Assessment (Scan/Image/Physica Exam) with                    ;
%* [PMS form].Select the Status of the Subject for the Next Trial Segment = [Status for Next Trial;
%*  Segment]                                                                                      ;
%* AND                                                                                            ;
%* Logic 3 {                                                                                      ;
%* Logic 3.1: (There is NO at least one OEFU.Date of Assessment <> NULL with                      ;
%* OEFU.Date of Assessment >= [ONCOLOGIC RESPONSE FORM].DATE RESPONSE DETERMINED/ ORAJ. Date of   ;
%* Assessment (Scan/Image/Physica Exam))                                                          ;
%* OR                                                                                             ;
%* Logic 3.2 (There is at least one OEFU.Date of Assessment <> NULL AND                           ;
%* OEFU.Date of Assessment >= [ONCOLOGIC RESPONSE FORM].DATE RESPONSE DETERMINED/ ORAJ. Date of   ;
%* Assessment (Scan/Image/Physica Exam) AND                                                       ;
%* OEFU.Select the Status of the Subject for the Next Trial Segment =  Continuing into Survival   ;
%* Follow-up Phase  OR  Not Continuing into Any Trial Segments                                    ;
%* AND                                                                                            ;
%* There is NO at least one OEDRA.Date of Assessment <> NULL with                                 ;
%* OEDRA.Date of Assessment >= [ONCOLOGIC RESPONSE FORM].DATE RESPONSE DETERMINED/ ORAJ. Date of  ;
%* Assessment (Scan/Image/Physica Exam) )                                                         ;
%* }                                                                                              ;
%* NOTES:                                                                                         ;
%* 1. Erroneous visit or deleted record will not be considered in the programming or output.      ;
%* 2. [ONCOLOGIC RESPONSE FORMS] are defined in the RSP_supp_doc.csv as well as the items         ;
%* mentioned in the logic for RSP forms, except, for ORAJ                                         ;
%* 3. If protocol have more than one [ONCOLOGIC RESPONSE FORMS] and at least one of the forms     ;
%* meets the criteria output is expected. If  RSP Form  parameter selection is leaving blank,     ;
%* report should work with the [ONCOLOGIC RESPONSE FORMS] that is present in the study and matches;
%*  with the forms defined in the RSP_supp_doc.csv                                                ;
%* 4. [PMS Form] and [Status for Next Trial Segment] are parameters that will be provided in the  ;
%* supporting document to be named ONC_OEFU_001_supp_<MKxxxxxxx>.csv                              ;
%* 5. For column 7, If ORAJ. Disease Recurrence Indicator = YES, please complete that column as   ;
%*  RECURRENCE SEEN                                                                               ;
%* 6. Requires supporting document to be named ONC_OEFU_001_supp_<MKxxxxxxx>.csv and will contain ;
%* the following columns and associated content:                                                  ;
%* 1. row for each Treatment Phase Order, PMS Form, Status for Next Trial Segment                 ;
%* 1. Treatment Phase Order (match with treatment phase, not allow blank. ie. if treatment phase  ;
%* is cycle 1 group should be 1)                                                                  ;
%* 2. PMS Form   PMS1 or PMST form that should be considered to indicate the beginning of the     ;
%* Follow up phase                                                                                ;
%* 3. Status for Next Trial Segment - Enter Status of the Subject for the Next Trial Segment from ;
%* PMS1/PMST that should be considered                                                            ;
%* E.g.                                                                                           ;
%* Treatment phase Order, PMS Form, Status for Next Trial Segment                                 ;
%* 1, PMS1, Continuing Into Safety Follow-up Phase                                                ;
%* 1, PMS1, Continuing Into Follow-up Phase                                                       ;
%* 2, PMS1, Continuing Into Efficacy Follow-up Phase                                              ;
%* 1, PMS1, Continuing Into Safety Follow-up Phase                                                ;
%* 2, PMS1, Continuing Into Follow-up Phase                                                       ;
%* 1, PMS1, Continuing Into Efficacy Follow-up Phase                                              ;
%* The number of rows in the supporting document will be represented in the Report Header as "# of;
%*  rows for customization".                                                                      ;
%* The actual information provided by the supporting doc can be outputted by selecting Y in the   ;
%* parameter "Supporting doc Page".                                                               ;
%* 7. Requires supporting document study_phase_supp_<MKxxxxxxx>.csv and will contain the following;
%*  columns and associated content:                                                               ;
%* This supporting document should be use if more study has two or more phases:                   ;
%* 1. Phase Order                                                                                 ;
%* 2. Treatment Phase                                                                             ;
%* 3. First Visitmnemonic of Treatment Phase                                                      ;
%* e.g.                                                                                           ;
%* 1, Initial Treatment Phase, Cycle 1                                                            ;
%* 2, Second Course Phase, Cycle 1 Course 2                                                       ;
%* 3, Crossover Phase, Crossover Cycle 1                                                          ;
%* The report logic should be checked within the same treatment phase defined in the supporting   ;
%* document.                                                                                      ;
%* For example, if user provides two Treatment Phases in supporting document like below:          ;
%* Phase Order, Treatment phase, First Visitmnemonic of Treatment Phase                           ;
%* 1,Initial Treatment Phase,Cycle 1                                                              ;
%* 2,Second Course Phase,Second Course Cycle 1                                                    ;
%* The treatment phase will be identified as following:                                           ;
%* Initial Treatment Phase: Cycle 1 <= Form.Date < Second Course Cycle 1                          ;
%* Second Course Phase: Second Course Cycle 1 <= Form.Date                                        ;
%* The actual information provided by the supporting doc can be outputted by selecting Y in the   ;
%* parameter "Study Phase Match Page".                                                            ;
%* This supporting document is required to be created once per trial. If it was already created   ;
%* and uploaded, there is no need to duplicate it.                                                ;
%*************************************************************************************************;
%* Program Flow:                                                                                  ;
%* --- 1. Check the existance of supporting doc for onc_oefu_001_jr_std ---                       ;
%* --- 2. Get dataset for subject/dov/oefu forms  ---                                             ;
%* --- 3. Get RESONSE forms according to supporting doc  ---                                      ;
%* --- 4. Define treatment phase ---                                                              ;
%* --- 5. main logic ---                                                                          ;
%* --- 6. Final Dataset with subdataset filter  ---                                               ;
%* --- 7. Generate output to Excel ---                                                            ;
%*************************************************************************************************;
%* Macros Used:                                                                                   ;
%* gdmsrpt_macros  orasetup  supp  obscnt  subdataset                                             ;
%*************************************************************************************************;
%* Revision History:                                                                              ;
%* Version 1 - Initial Version                                                                    ;
%* Version 2 - Version 2 - Code update to fix code execute error when response forms have two response session;
%*             [Junchao Fang 2020Jun24]                                                           ;
%* Version 3 - Logic updated to include PMS1, also supporting document requirements are updated to;
%*             match with the DRP requirements and ORST item question is added in the logic.      ;
%*             [Junchao 21Mar2021]                                                                ;
%* Version 4   RSP Master Supporting document added. OEDRA added for Scenario 1. Scenario 2       ;
%*             removed. PMS form removed from Parameter Selection options [Tianle Sun 7/1/2022]   ;                                                                                            
%*************************************************************************************************;
*/



%macro onc_oefu_001_jr_std;
	%let checkid = %upcase(onc_oefu_001_jr_std);
	%let vernum = 4;
	%let reptitle=Missing OEFU and OEDRA during follow up phase when Progressive Disease is reported in the response form.;
	%let repdesc=This report will output subjects who have Progressive Disease in the lesion response form during follow up phase but no OEFU/OEDRA is provided.;

	%gdmsrptheader;
	%orasetup;

%* --- 1. Check the existance of supporting doc for ONC_OEFU_001_JR_STD --- *;
%if %sysfunc(fileexist(/cdm/prod/extfiles/Supp_Docs/ONC_OEFU_001_JR_STD/ONC_OEFU_001_supp_&prot..csv)) = 0 %then %do;
/*%if %sysfunc(fileexist(/cdm/test/corelib/ONC_OEFU_001_supp_&prot..csv)) = 0 %then %do;*/

		title6	&titleformat "# of rows for customization: &cnt_list";
		title7	&titleformat "Supporting Doc Page: &supppage";

	data _null_;
		file print;
		put #10 @10 "ONC_OEFU_001_JR_STD Supporting Document Not Present for This Trial";
		put #12 @10 "Please check the DRP for Details and Contact your RaM Programmer for Assistance";
	run;
	
%end;

	%else %if %sysfunc(fileexist(/cdm/prod/extfiles/Supp_Docs/STUDY_PHASE_SUPP/study_phase_supp_&prot..csv)) = 0 %then %do;
/*	%else %if %sysfunc(fileexist(/cdm/test/corelib/study_phase_supp_&prot..csv)) = 0 %then %do;*/
		    title6	&titleformat "# of rows for customization: &cnt_list";
	        title7	&titleformat "Supporting Doc Page: &supppage";
			title8	&titleformat "Study Phase Page: &spsupppage";

			data _null_;
				file print;
				put #10 @10 "study_phase_supp_&prot..csv Supporting Document Not Present for This Trial";
				put #12 @10 "Please check the DRP for Details and Contact your RaM Programmer for Assistance";
			run;			
		%end;


%else %do;

%* --- 2. Get information from supporting doc  --- *;
	%* --- 2.1 Infile supporting document --- *;
	%* --- 2.1.1 Report specific supporting document --- *;

  filename supp "/cdm/prod/extfiles/Supp_Docs/ONC_OEFU_001_JR_STD/ONC_OEFU_001_supp_&prot..csv";
/*	filename supp "/cdm/test/corelib/ONC_OEFU_001_supp_&prot..csv";*/
/*    filename supp "C:\Users\suntianl\Downloads\JRSUPP\ONC_OEFU_001_supp_&prot..csv";*/

		data onc_oefu_csv;
			format Group best12. PMS_form $500. status $500.;
			infile supp missover pad DSD delimiter = ',' firstobs=2;
			input Group PMS_form status ;
			if missing(_INFILE_) then delete;
		run;
		%supp(onc_oefu_csv);
	%obscnt(onc_oefu_csv);
	%let cnt_list = &nobs;

	%* --- 2.1.2 Global supporting document --- *;
	filename supp "/cdm/prod/extfiles/Supp_Docs/OTHER_GLOBAL_SUPP/RSP_supp_doc.csv";
/*	filename supp "C:\Users\suntianl\Downloads\JRSUPP\RSP_supp_doc.csv";  */

	data g_rsp_supp;
		format viewname $50. original_itemquestion $200. itemquestion $200. controllevel $10. columnname $200. prefix $10.;
		infile supp missover pad DSD delimiter = ',' firstobs=2;
		input viewname original_itemquestion  itemquestion controllevel columnname prefix;
		if missing(_INFILE_) then delete;
		form_alias='RSP';
	run;

	data global_supp;
		format formname $50. viewname $50. original_itemquestion $200. itemquestion $200. controllevel $10. columnname $200. prefix $10.;
		set g_rsp_supp;
		formname=substr(viewname,4,find(cats(viewname,'_'),'_',4)-4);
	run;

	%supp(global_supp);
	%obscnt(global_supp);
	%let gcnt_list = &nobs;

	%* --- 2.1.3 Study Phase supporting document --- *;
	filename supp "/cdm/prod/extfiles/Supp_Docs/STUDY_PHASE_SUPP/study_phase_supp_&prot..csv";
/*	filename supp "C:\Users\suntianl\Downloads\JRSUPP\study_phase_supp_&prot..csv";*/
/*	filename supp "/cdm/test/corelib/study_phase_supp_&prot..csv";*/

	data phase_csv;
		format tporder $10. tpname $100. tpvisit $100. ;
		infile supp missover pad DSD delimiter = ',' firstobs=2;
		input tporder tpname tpvisit;
		if missing(_INFILE_) then delete;
	run;
	%supp(phase_csv);
	%obscnt(phase_csv);
	%let cnt_phase = &nobs;

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
          values('ORAJFM','CV_ORAJFM','DISEASE RECURRENCE INDICATOR','DISEASE RECURRENCE INDICATOR','1','ORAJRSORRESNLRC_ORAJRSORRE_1','CD','ORAJ')
		  values('ORAJFM','CV_ORAJFM','DATE OF ASSESSMENT (SCAN/IMAGE/PHYSICAL EXAM)','DATE OF ASSESSMENT','1','DT_ORAJRSDTCIT','DT','ORAJ')
		  values('ORAJFM','CV_ORAJFM','SPONSOR ID NUMBER','SPONSOR ID NUMBER','1','ORAJRSSPIDIT','CD','ORAJ')
		  values('OEFUFM','CV_OEFUFM','DATE OF ASSESSMENT','DATE OF ASSESSMENT','1','DT_OEFUDSDTCIT','DT','OEFU')
		  values('OEFUFM','CV_OEFUFM','SELECT THE STATUS OF THE SUBJECT FOR THE NEXT TRIAL SEGMENT','NEXT TRIAL PHASE FIELD','1','OEFUDSTERMNTSRC_OEFUDSTERM_1',' ','OEFU')
		  values('OEDRAFM','CV_OEDRAFM','DATE OF ASSESSMENT','DATE OF ASSESSMENT','1','DT_OEDRADSDTCIT','DT','OEDRA')
		  values('PMS1FM','CV_PMS1FM','SELECT THE STATUS OF THE SUBJECT FOR THE NEXT TRIAL SEGMENT','STATUS FOR NEXT TRIAL SEGMENT','1','PMS1DSTERMSTATRC_PMS1DSTER_1',' ','PMS1')
		  values('PMSTFM','CV_PMSTFM','SELECT THE STATUS OF THE SUBJECT FOR THE NEXT TRIAL SEGMENT','STATUS FOR NEXT TRIAL SEGMENT','1','PMSTDSTERMSTATRC_PMSTDSTER_1',' ','PMST')
		  values('PMS1FM','CV_PMS1FM','DATE OF ASSESSMENT','DATE OF ASSESSMENT','1','DT_PMS1DSDTCIT','DT','PMS1')
          values('PMSTFM','CV_PMSTFM','DATE OF ASSESSMENT','DATE OF ASSESSMENT','1','DT_PMSTDSSTDTCIT','DT','PMST')

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
			   and s.original_itemquestion=upper(strip(r.itemquestion))
			 order by s.viewname, s.itemquestion;

	    disconnect from dbtest;
	quit;

	%* --- 3.2 Programmer Action Needed: Assign form/item alias based on itemquestion and form based on report design ---*;
	data study_supp_alias (keep=formname viewname columnname item_alias form_alias mformidx mdeletedform aitemsetidx adeletedform adeleteditem);
		set studyfm;
		format item_alias $50. form_alias $50.;
		if upcase(strip(form_alias))in('RSP','ORAJ') and upcase(compbl(itemquestion)) in ('OVERALL RESPONSE','RESPONSE','HEMATOLOGIC RESPONSE','OVERALL IRECIST RESPONSE',
                  'OVERALL RECIST RESPONSE','OVERALL IRRECIST RESPONSE','PET RESPONSE','DISEASE RECURRENCE INDICATOR') and prefix='CD' and controllevel = '1' then do; 
			item_alias = 'response_rsp';
			form_alias = 'RSP';
		end;
		else if upcase(strip(form_alias))in('RSP','ORAJ') and upcase(compbl(itemquestion)) in ('DATE RESPONSE DETERMINED','DATE OF ASSESSMENT') and prefix='DT' and controllevel = '1' then do; 
			item_alias = 'dt_rsp';
			form_alias = 'RSP';
		end;
		else if upcase(strip(form_alias))in('RSP','ORAJ') and upcase(compbl(itemquestion)) in ('SPONSOR ID NUMBER') and prefix='CD' and controllevel = '1' then do; 
			item_alias = 'spid_rsp';
			form_alias = 'RSP';
		end;
		else if upcase(strip(form_alias))='OEFU' and upcase(compbl(itemquestion)) in ('DATE OF ASSESSMENT') and prefix='DT' and controllevel = '1' then do; 
			item_alias = 'dt_oefu';
		end;
		else if upcase(strip(form_alias))='OEFU' and upcase(compbl(itemquestion)) in ('NEXT TRIAL PHASE FIELD') and prefix=' ' and controllevel = '1' then do; 
			item_alias = 'status_oefu';
		end;
		else if upcase(strip(form_alias))='OEDRA' and upcase(compbl(itemquestion)) in ('DATE OF ASSESSMENT') and prefix='DT' and controllevel = '1' then do; 
			item_alias = 'dt_oedra';
		end;
		else if upcase(strip(form_alias)) in ('PMS1','PMST') and upcase(compbl(itemquestion)) in ('STATUS FOR NEXT TRIAL SEGMENT') and prefix=' ' and controllevel = '1' then do; 
			item_alias = 'status_pms';
			form_alias = 'PMS';
		end;
		else if upcase(strip(form_alias)) in ('PMS1','PMST') and upcase(compbl(itemquestion)) in ('DATE OF ASSESSMENT') and prefix='DT' and controllevel = '1' then do; 
			item_alias = 'dt_pms';
			form_alias = 'PMS';
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
	data rsp_0;
		format subjectid best12. visitid best12. visitorder best12. visitmnemonic $4000. formid best12. formmnemonic $4000. formidx_m best12. itemsetidx_a best12. 
        	   response_rsp $500. dt_rsp datetime20. spid_rsp best12.;
		stop;
	run;

	data oefu_0;
		format subjectid best12. visitid best12. visitorder best12. visitmnemonic $4000. formid best12. formmnemonic $4000. formidx_m best12. itemsetidx_a best12. 
		       status_oefu $500. dt_oefu datetime20. ;
		stop;
	run;

	data oedra_0;
		format subjectid best12. visitid best12. visitorder best12. visitmnemonic $4000. formid best12. formmnemonic $4000. formidx_m best12. itemsetidx_a best12. 
		       dt_oedra datetime20. ;
		stop;
	run;

	data pms_0;
		format subjectid best12. visitid best12. visitorder best12. visitmnemonic $4000. formid best12. formmnemonic $4000. formidx_m best12. itemsetidx_a best12. 
		       status_pms $500. dt_pms datetime20.;
		stop;
	run;


	%macro movetable(table);
		proc delete data=&table;
		run;
	%mend;

	%macro gdataset;
	%GLOBAL rspformdis;
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


		data rsp;
			set rsp_:;
		run;

		data oefu;
			set oefu_:;
		run;

		data oedra;
			set oedra_:;
		run;

		data pms;
			set pms_:;
		run;

/*%LET rspform = OTPRL;*/

data rsp;
set rsp;
%if %length(&rspform) gt 0  %then %do;
    %let rspformdis = %sysfunc(upcase(&rspform));
%let rspformlist = %sysfunc(catq(1ac,&rspformdis));
where formmnemonic in (&rspformlist);
%end;
%else %do;
%let rspformdis = All;
%end;        
run;


    %end;

	%do i = 0 %to &ecrf_nbr;
		%movetable(rsp_&i oefu_&i oedra_&i pms_&i);
	%end;

	%mend;
	%gdataset;


%* --- 4. Get treatment phase by subject--- *;
	%macro getphase(study_phase_supp);
	    proc sql;
	        create table supp_dov as
	            select distinct subjectid, visitid, visitmnemonic, dt_dov as tpdtstr, input(tporder, best12.) as tporder, tpname 
	              from &study_phase_supp s, dov d
	             where s.tpvisit = upcase(strip(d.visitmnemonic))
	               and d.err_visit is missing
	               and d.dt_dov is not null;
	    quit;

	    proc sort data = supp_dov;
	        by subjectid descending tpdtstr;
	    run;

	    data subj_tp;
		    format next_tporder best12. next_tpname $100. next_tpdtstr datetime20.;
		    set supp_dov;
	        by subjectid descending tpdtstr;
	           next_tporder = lag(tporder);
	           next_tpname = lag(tpname);
	           next_tpdtstr = lag(tpdtstr);
	        if first.subjectid then do;
	           next_tporder =.;
	           next_tpname = '';
	           next_tpdtstr = datetime();
	        end;
	    run;

		proc sort data = subj_tp;
			by subjectid tpdtstr;
		run;

		data subj_tp;
		    format pre_tporder best12. pre_tpname $100. pre_tpdtstr datetime20.;
	        set subj_tp;
			by subjectid tpdtstr;
			pre_tporder = lag(tporder);
			pre_tpname = lag(tpname);
			pre_tpdtstr = lag(tpdtstr);
			if first.subjectid then do;
			    pre_tporder =.;
				pre_tpname = '';
				pre_tpdtstr = input('01JAN1960:00:00:00',datetime20.);
			end;
		run;
	%mend;

	%getphase(phase_csv);

%obscnt(subj_tp);

%if  &nobs=0 %then %do;
data finalall;
set dov (obs=0);
run;
%end;
%else %do;
data phase (rename=tpdtstr=pre_dt_dov);
	set subj_tp(rename=next_tpdtstr=next_dt_dov);
    seq=tporder;
run;
proc sql;
     create table dov_phase as
     select phase.*,PMS_form,status from phase inner join onc_oefu_csv
     on phase.seq=input(onc_oefu_csv.group,best12.)
     where not missing(pre_dt_dov)
     ;
quit;


%* --- 5. Final Dataset with subdataset filter  --- *;	
/*oefu pms oraj oedra and respose form in the same treatment phase*/
proc sql;
	create table oefu_2 as
		select distinct oefu.*,p.seq from oefu inner join dov_phase p
			on oefu.subjectid= p.subjectid
		where oefu.dt_oefu>=pre_dt_dov
			and oefu.dt_oefu<next_dt_dov;
	create table response_2 as
		select distinct r.*,p.seq from rsp r inner join dov_phase p
			on r.subjectid=p.subjectid
		where r.dt_rsp>=pre_dt_dov
			and r.dt_rsp<next_dt_dov;
   create table pms_2 as
		select distinct r.*,p.seq from pms r inner join dov_phase p
			on r.subjectid=p.subjectid
			and r.formmnemonic=p.pms_form
		where r.dt_pms>=pre_dt_dov
			and r.dt_pms<next_dt_dov;
   create table oedra_2 as
		select distinct oedra.*,p.seq from oedra inner join dov_phase p
			on oedra.subjectid= p.subjectid
		where oedra.dt_oedra>=pre_dt_dov
			and oedra.dt_oedra<next_dt_dov;
quit;


/*Scenario 1*/

proc sort DATA=dov_phase out=supp_phase nodupkey;
	by seq;
run;

data _null_;
	set supp_phase end=eof;
	call symput('seq'||left(_n_),strip(seq));
	if eof then
	call symput('n',strip(_n_));
run;
/*%macro a;*/
%let x=1;
%do x=1 %to &n;

	proc sql noprint;
		select distinct catt("'",status,"'") into:status SEPARATED by ',' from onc_oefu_csv 
			where input(GROUP,best12.)=&x;	quit;
%put  &status;
    proc sql;
		create table MOEFU_&x as
        select a.*,. as dt_oedra from(
			select distinct a.*,p.FORMMNEMONIC as pms_form,p.visitmnemonic as pms_visit,datepart(dt_pms) as dt_pms2 format date9.
                    ,'OEFU' as Missing from
				(
			select r.*,dov.dt_dov from dov, onc_oefu_csv , Response_2 r
				where r.subjectid=dov.subjectid 
					and dov.err_visit is null
					and input(onc_oefu_csv.group,best12.)=&x
					and r.seq=&x 
					and not missing (r.dt_rsp) /*<Response form>. Date of Response <> NULL */
					and upcase(strip(r.response_rsp)) in ('PROGRESSIVE DISEASE','IRPROGRESSIVE DISEASE','ICPD','YES')
          /*<Response form>. Overall Response/ Overall RECIST Response/ Overall IRECIST Response = Progressive Disease/irProgressive Disease/Icpd  OR ORAJ. Disease Recurrence Indicator = YES*/
                 ) a inner join pms_2 p
					    on a.subjectid=p.subjectid 
						and p.seq=&x
						and upcase(strip(p.status_pms)) in (&status)
						and datepart(dt_pms) < datepart(a.dt_rsp)
            /*PMS1. Date of Assessment with status IS less than <Response Form.Date of Response> */
                 )a left join oefu_2 o
					    on a.subjectid=o.subjectid 
						and o.seq=&x
						and dt_oefu is not null  
						and datepart(dt_oefu) >= datepart(a.dt_rsp)
                 where o.subjectid is null
            /*NO OEFU. Date of Assessment GE than <Response Form.Date of Response> [Missing OEFU] */
		;
	quit;


proc sql;
		create table MOEDRA_&x as
		select a.*,datepart(dt_oedra)as dt_oedra2 format date9. from(
        select a.* from(
			select distinct a.*,p.FORMMNEMONIC as pms_form,p.visitmnemonic as pms_visit,datepart(dt_pms) as dt_pms2 format date9.
                    ,'OEDRA' as Missing from
				(
			select r.*,dov.dt_dov from dov, onc_oefu_csv , Response_2 r
				where r.subjectid=dov.subjectid 
					and dov.err_visit is null
					and input(onc_oefu_csv.group,best12.)=&x
					and r.seq=&x 
					and not missing (r.dt_rsp) /*<Response form>. Date of Response <> NULL */
					and upcase(strip(r.response_rsp)) in ('PROGRESSIVE DISEASE','IRPROGRESSIVE DISEASE','ICPD','YES')
          /*<Response form>. Overall Response/ Overall RECIST Response/ Overall IRECIST Response = Progressive Disease/irProgressive Disease/Icpd  OR ORAJ. Disease Recurrence Indicator = YES*/
                 ) a inner join pms_2 p
					    on a.subjectid=p.subjectid 
						and p.seq=&x
						and upcase(strip(p.status_pms)) in (&status)
						and datepart(dt_pms) < datepart(a.dt_rsp)
            /*PMS1. Date of Assessment with status IS less than <Response Form.Date of Response> */
                 )a inner join oefu_2 of
					    on a.subjectid=of.subjectid 
						and of.seq=&x
						and dt_oefu is not null  
						and datepart(dt_oefu) >= datepart(a.dt_rsp)
						and upcase(strip(of.status_oefu)) in ('CONTINUING INTO SURVIVAL FOLLOW-UP PHASE','NOT CONTINUING INTO ANY TRIAL PHASE')
            /*OEFU. Date of Assessment GE than <Response Form.Date of Response> */
				)a left join oedra_2 oe
				        on a.subjectid=oe.subjectid
						and oe.seq=&x
						and dt_oedra is not null 
						and datepart(dt_oedra) >= datepart(a.dt_rsp)
                 where oe.subjectid is null
            /*NO OEDRA. Date of Assessment GE than <Response Form.Date of Response> */

		;
	quit;
	%end;
/*%mend;*/
/*%a;*/

data final(drop= dt_rsp formidx_m dt_dov);
	format response_date date9.  dov date9. Missing $200.;
	set MOEFU_: MOEDRA_:;
	response_date=datepart(dt_rsp);
	dov=datepart(dt_dov);
	if upcase(strip(response_rsp)) = "YES" then response_rsp = "RECURRENCE SEEN";
run;


%* --- 6. Final Dataset with subdataset filter  --- *;
%subdataset(subject);

proc sql;
	create table finalall as 
		select distinct  country,sitenbr, subjnbr, f.*  
			from subject s inner join final f
				on s.subjectid = f.subjectid;
quit;

proc sort data = finalall nodupkey;
	by country sitenbr subjnbr formmnemonic spid_rsp response_date  response_rsp  dov Missing;
run;
%end;

%* --- 7. Generate output to Excel --- *;
%obscnt(finalall);

%if &nobs=0 %then
	%do;
		ods tagsets.excelxp  
			%if &putfil=NON %then &putfilnm;
		options ( embedded_titles        =  'yes'
			embedded_footnotes     =  'yes'
			print_footer           =  'Page &amp;P of &amp;N'
			sheet_name             =  'onc_oefu_001_jr_std'
			orientation            =  'landscape'
			absolute_column_width  =  '100');
		options formchar='|_' missing=' ' pageno=1 nobyline ls=160;
		title6	&titleformat "# of rows for customization: &cnt_list";
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

	%end;
%else
	%do;
		ods tagsets.excelxp
			%if &putfil=NON %then &putfilnm;
		options ( embedded_titles        =  'yes'
			embedded_footnotes     =  'yes'
			print_footer           =  'Page &amp;P of &amp;N'
			sheet_name             =  'onc_oefu_001_jr_std'
			orientation            =  'landscape'
			absolute_column_width  =  '20,10,15,10,10,15,30,15,15,15,15');
		options formchar='|_' missing=' ' pageno=1 nobyline ls=150;
		title6	&titleformat "# of rows for customization: &cnt_list";
		title7	&titleformat "Supporting Doc Page: &supppage";

		proc report data=finalall headline headskip spacing=1 split='*' missing
			style(report)={just=center font_face=times   font_size=1 cellspacing=2 borderwidth=2 background=white}
			style(header)={vjust=top   font_face=verdana font_size=2 font_weight=bold cellheight = 22 background=#7c98B0 
			foreground = white htmlstyle="text-align:center"}
			style(column)={just=center font_face=calibri background=white htmlstyle="text-align:center"};
			column country sitenbr subjnbr formmnemonic spid_rsp response_date response_rsp pms_form pms_visit dt_pms2 Missing;
			define country			/ display   width=20 'Country'	flow;
			define sitenbr       / display   width=10 'Site' style(column)={tagattr='format:@'};
			define subjnbr       / display	width=15 'Subject Number' style(column)={tagattr='format:@'};
			define formmnemonic		/ display	width=10 'Response Form' flow;
			define spid_rsp		/ display	width=10 'Seq ID' flow;
			define response_date	/ display	width=15 'Date Response Determined ' flow;
			define response_rsp		/ display	width=30 'Overall Response ' flow;
			define pms_form	/ display	width=15 'PMS Form';
			define pms_visit	/ display	width=15 'PMS Visit' flow;
			define dt_pms2		/ display	width=15 'PMS Date' flow;   
            define Missing	/ display	width=15 'Missing Form';

		run;

	%end;

%if &supppage = Y %then
	%do;
		ods tagsets.excelxp  
			options ( embedded_titles        =  'yes'
			embedded_footnotes     =  'yes'
			print_footer           =  'Page &amp;P of &amp;N'
			sheet_name             =  'onc_oefu_001_jr_std_supp_doc'
			orientation            =  'landscape'
			absolute_column_width  =  '5,20,30');

		data onc_oefu_csv;
			%if &cnt_list eq 0 %then %do;
					if _n_ = 1 then output;
					set onc_oefu_csv;
					output;
				%end;
			%else
				%do;
					set onc_oefu_csv;
					output;
				%end;
		run;

		options formchar='|_' missing=' ' pageno=1 nobyline ls=150;
		title6	&titleformat "# of rows for customization: &cnt_list";
		title7	&titleformat "Supporting Doc Page: &supppage";

		proc report data=onc_oefu_csv headline headskip spacing=1 split='*' missing
			style(report)={just=center font_face=times   font_size=1 cellspacing=2 borderwidth=2 background=white}
			style(header)={vjust=top   font_face=verdana font_size=2 font_weight=bold cellheight = 22 background=#7c98B0 
			foreground = white htmlstyle="text-align:center"}
			style(column)={just=center font_face=calibri background=white htmlstyle="text-align:center"};
			column  group PMS_form  status ;
			define GROUP       	/ display   width=5 'Treatment Phase Order';
			define PMS_form      / display   width=20 'PMS Form' flow;
			define status	/ display 	width=30 'Status for Next Trial Segment' flow;
		run;

	%end;

	%if &spsupppage = Y %then %do;

		ods tagsets.excelxp  
			options ( embedded_titles        =  'yes'
					  embedded_footnotes     =  'yes'
					  print_footer           =  'Page &amp;P of &amp;N'
					  sheet_name             =  'study_phase_supp_doc'
					  orientation            =  'landscape'
					  absolute_column_width  =  '20,50,50');

		data supp_1;
			%if &cnt_phase eq 0 %then %do;
				if _n_ = 1 then output;
				set phase_csv;
				output;
			%end;
			%else %do;
				set phase_csv;
			output;
			%end;
		run;

		options formchar='|_' missing=' ' pageno=1 nobyline ls=160;

		    title6	&titleformat "# of rows for customization: &cnt_list";
	        title7	&titleformat "Supporting Doc Page: &supppage";
			title8	&titleformat "Study Phase Page: &spsupppage";

		proc report data=supp_1 headline headskip spacing=1 split='*' missing
			style(report)={just=center font_face=times   font_size=1 cellspacing=2 borderwidth=2 background=white}
			style(header)={vjust=top   font_face=verdana font_size=2 font_weight=bold cellheight = 22 background=#7c98B0 
				foreground = white htmlstyle="text-align:center"}
			style(column)={just=center font_face=calibri background=white htmlstyle="text-align:center"};
			column tporder tpname tpvisit;
			define tporder	 / display   width=20 'Treatment Phase Order' flow;
			define tpname    / display   width=50 'Treatment Phase' flow;
			define tpvisit   / display   width=50 'First Visitmnemonic of Treatment Phase' flow;
		run;	
	%end; /* End of &spsupppage = Y */
%end;

%let putfil=YES;
ods tagsets.excelxp close;

%deletall;
run;

%mend;















