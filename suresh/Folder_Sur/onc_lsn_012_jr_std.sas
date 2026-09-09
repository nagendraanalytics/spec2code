/*************************************************************************************************;
%* Report Description:                                                                            ;
%* This report will list subjects who do not have at least one measurable Lesion at baseline      ;
%* within the specify window.                                                                     ;
%*************************************************************************************************;
%* Report Logic:                                                                                  ;
%* DOV.Date of Visit for First Visit Mnemonic for a Treatment Phase <> NULL                       ;
%* OR                                                                                             ;
%* SR.Date of Assessment <> NULL                                                                  ;
%* AND                                                                                            ;
%* There is not at least one 'LSN eCRF'                                                           ;
%* Logic 2:                                                                                       ;
%* DOV.Date of Visit for First Visit Mnemonic for each Treatment Phase <> NULL                    ;
%* OR                                                                                             ;
%* SR.Date of Assessment <> NULL                                                                  ;
%* AND                                                                                            ;
%* (There is NO 'LSN eCRF' with                                                                   ;
%* 'Date of Lesion evaluation' that is within [X] days prior the DOV.Date of Visit for First Visit;
%*  Mnemonic for each Treatment Phase OR SR.Date of Assessment                                    ;
%* AND                                                                                            ;
%* 'Lesion Category'/'Tumor Identification' = Any of the values selected as 'Lesion Type' in the  ;
%* supporting document)                                                                           ;
%* Note 1:  Date of Visit for First Visit Mnemonic for each Treatment Phase is defined in the     ;
%* Study Phase Supporting Document.                                                               ;
%* The items 'LSN eCRF', 'Lesion Type' and [X](window days) are values from report-specific       ;
%* supporting document.                                                                           ;
%* The items 'Date of Lesion evaluation', 'Lesion Category' and 'Tumor Identification' are defined;
%*  in the LSN_supp_doc.                                                                          ;
%* Note 2: Erroneous visit or deleted record will not be considered in the programming or output. ;
%* Note 3: If report-specific supporting document is not provided, display the message as         ;
%* "ONC_LSN_012_JR_STD Supporting Document Not Present for This Trial".                           ;
%* Note 4: Produce output for each Treatment Phase separately                                     ;
%* Note 5: LCDM should determine whether the baseline evaluation should be done counting from DOV ;
%* or from SR and it should be defined in the supporting document                                 ;
%* Requires report-specific supporting document to be named ONC_LSN_012_supp_<MKxxxxxxx>.csv and  ;
%* will contain the following columns and associated content: 1 row for each expected Lesion      ;
%* Evaluation Form, First Visit of treatment Phase, Window of days, Lesion Type, Date of          ;
%* Assessment eCRF                                                                                ;
%* Definition of each column criteria:                                                            ;
%* 1. LSN eCRF   Lesion Evaluation form to be used in the logic [e.g. LSNEV, LSRIR, LSNPC, LSNPI, ;
%* LSNIR, LSNHM]                                                                                  ;
%* 2. Window of days   Number of days to be used in Logic 2                                       ;
%* 3. Lesion Type   Lesion Category/Lesion Identification/Tumor Identification to be used in logic;
%*  2. Enter NA if the report should consider any value.                                          ;
%* 4. Date of Assessment eCRF   eCRF from which the window of days for baseline evaluation should ;
%* be calculated (input DOV or SR)                                                                ;
%* e.g.1                                                                                          ;
%* LSN eCRF, Window of days, Lesion Type, Date of Assessment eCRF                                 ;
%* LSRIR, 28, Target Nodal, SR                                                                    ;
%* LSRIR, 28, Target Extra Nodal, SR                                                              ;
%* LSNEV, 28, Target Nodal, DOV                                                                   ;
%* LSNEV, 28, Target Extra Nodal, DOV                                                             ;
%* Also requires a Study Phase Supporting Document to be created only one time per trial and that ;
%* will work for multiple reports:                                                                ;
%* The Study Phase Supporting Document is required for all trials regardless if only one treatment;
%*  phase is present.                                                                             ;
%* This supporting document is only required to be created once per trial. If it was already      ;
%* created and uploaded, there is no need to duplicate it.                                        ;
%* Required supporting document should be named as study_phase_supp_<MKxxxxxxx>.csv and will      ;
%* contain the following columns and associated content:                                          ;
%* One row for each Treatment Phase                                                               ;
%* 1. Phase Order: the order on which phases will appear on protocol                              ;
%* 2. Treatment Phase: name of each study phase (Initial Treatment Phase, Neodjuvant Phase, Second;
%*  Course Phase)                                                                                 ;
%* 3. First Visitmnemonic of Treatment Phase: the first visit on which treatment is expected to be;
%*  administered on each phase.                                                                   ;
%* e.g.                                                                                           ;
%* 1, Initial Treatment Phase, Cycle 1                                                            ;
%* 2, Second Course Phase, Cycle 1 Course 2                                                       ;
%* 3, Crossover Phase, Crossover Cycle 1                                                          ;
%*************************************************************************************************;
%* Program Flow:                                                                                  ;
%* --- 1. Check the existance of supporting doc for ONC_LSN_012_JR_STD                            ;
%* --- 2. Global supporting document                                                              ;
%* --- 3. Manage itemquestion according to spec and forms based on study                          ;
%* --- 4. Define treatment phase                                                                  ;
%* --- 5. Final Dataset with subdataset filter                                                    ;
%* --- 6. Generate output to Excel                                                                ;
%*************************************************************************************************;
%* Macros Used:                                                                                   ;
%* gdmsrpt_macros                                                                                 ;
%*************************************************************************************************;
%* Revision History:                                                                              ;
%* Version 1 - Initial Version                                                                    ;
%* Version 2 - Report update for covering the transformation for multiple ITEMREFNAMES            ;
%*             [Junchao20200716]                                                                  ;
%* Version 3 - Report update for inclusion of study phase supporting doc and                      ;
%*             internal master supporting document (LSN_supp_doc)[Junchao Fang 14Sep2021]         ;
%* Version 4 - Version 4 - Code update to make the coding for logic Date of Lesion evaluation     ;
%*             that is within [X] days prior the DOV.Date of Visit for First Visit Mnemonic for   ;
%*             each Treatment Phase ” as the same as " Date of Lesion evaluation  >= DOV.Date;
%*             [x] days  of Visit for First Visit Mnemonic for each Treatment Phase And ‘Date of ;
%*             Lesion evaluation’  < = DOV.Date  of Visit for First Visit Mnemonic for each     ;
%*             Treatment Phase"; no spec update [Junchao Fang 18Mar2022]                          ; 
%*Version 5 - Supporting document update to include an option to choose SR Date of Assessment as a;
%*			  reference point [Junchao Fang 13Jul2022]                                            ;
%*Version 6 - Code update. Updating to fix missing output when study provide two or more treatment;
%*            phase. [Junchao Fang 18Jan2023]                                                     ;
%*Version 7 - Coding update to include treatment phase in main supporting documents to consider ;
%*               dov or sr date based on treatment phase when study provide two or more treatment;
%*            phase. [Rahul Raj] [15-May-2023]                                                     ;
%*Version 8 - Coding update to fix the issue for SR form to consider from any visitnemonic       ;
%*               and remove the Lesion Category item Question from code                           ;
%*             [Rahul Raj] [20-Sep-2023]
%*************************************************************************************************;
*/
%macro onc_lsn_012_jr_std;

	%let checkid = %upcase(onc_lsn_012_jr_std);
	%let vernum = 8;
	%let reptitle=Baseline Lesion is Not present or out of window;
	%let repdesc=This report will list subjects who do not have at least one measurable Lesion at baseline within the specify window.;
	%gdmsrptheader;
	%orasetup;

	%* --- 1. Check the existance of supporting doc and treatment phase supporting document for ONC_LSN_012_JR_STD --- *;
	%if %sysfunc(fileexist(/cdm/prod/extfiles/Supp_Docs/ONC_LSN_012_JR_STD/ONC_LSN_012_supp_&prot..csv)) = 0 %then


		%do;

			data _null_;
				file print;
				put #10 @10 "onc_lsn_012_jr_std Supporting Document Not Present for This Trial";
				put #12 @10 "Please check the DRP for Details and Contact your RaM Programmer for Assistance";
			run;

		%end;
	%else
		%do;

	%if %sysfunc(fileexist(/cdm/prod/extfiles/Supp_Docs/STUDY_PHASE_SUPP/study_phase_supp_&prot..csv)) = 0 %then %do;
	

		data _null_;
			file print;
			put #10 @10 "&checkid treatment phase supporting document Not Present for This Trial";
			put #12 @10 "Please check the DRP for Details and Contact your RaM Programmer for Assistance";
		run;
		
	%end;
	%* --- 2 infile and treatment phase supporting document for ONC_LSN_012_JR_STD, global supporting document --- *;

	%else %do;

		filename supp "/cdm/prod/extfiles/Supp_Docs/STUDY_PHASE_SUPP/study_phase_supp_&prot..csv";

		    data phase_csv;
			format tporder $10. tpname $100. tpvisit $100. ;
			infile supp missover pad DSD delimiter = ',' firstobs=2;
			input tporder tpname tpvisit;
			if missing(_INFILE_) then delete;
		run;
		%supp(phase_csv);
		%obscnt(phase_csv);
		%let cnt_phase = &nobs;
	
		filename supp "/cdm/prod/extfiles/Supp_Docs/ONC_LSN_012_JR_STD/ONC_LSN_012_supp_&prot..csv";


				data supp;
				format  form $500. period $100. window best12. type $500. doa $20.;
				infile supp missover pad DSD delimiter = ',' firstobs=2;
				input  form period window type doa;

				if missing(_INFILE_) then
					delete;
			run;

			%supp(supp);
			%obscnt(supp);
			%let cnt_list = &nobs;

		filename supp "/cdm/prod/extfiles/Supp_Docs/OTHER_GLOBAL_SUPP/LSN_supp_doc.csv";

            data g_lsn_supp;
			format viewname $50. original_itemquestion $200. itemquestion $200. controllevel $10. columnname $200. prefix $10.;
			infile supp missover pad DSD delimiter = ',' firstobs=2;
			input viewname original_itemquestion  itemquestion controllevel columnname prefix;
			if missing(_INFILE_) then delete;
			form_alias='LSN';
		run;

		data global_supp;
			format formname $50. viewname $50. original_itemquestion $200. itemquestion $200. controllevel $10. columnname $200. prefix $10.;
			set g_lsn_supp;
			formname=substr(viewname,4,find(cats(viewname,'_'),'_',4)-4);
		run;

	%supp(global_supp);
	%obscnt(global_supp);
	%let gcnt_list = &nobs;

    proc sql noprint;
	create table global_supp as
	    select a.* from global_supp a, supp b
		where a.formname=cats(b.form,'FM')
		;
	quit;


/*	PROC PRINT DATA=global_supp;*/
/*	RUN;*/
/*	ENDSAS;*/

%* --- 3. Manage itemquestion according to spec and forms based on study ---*;
%* --- 3.1 get rd_datadictionary and define form/item based on study ---*;
	proc sql noprint;
		insert into global_supp
			  values('SRFM','CV_SRFM','DATE OF ASSESSMENT','DATE OF ASSESSMENT','1','DT_SRDSDTCAASMTROIT','DT','SR')              
			  values('SRIVRSFM','CV_SRIVRSFM','DATE OF ASSESSMENT','DATE OF ASSESSMENT','1','DT_SRDSDTCAASMTROIT','DT','SRIVRS')        
			  ;
	
	    connect to oracle as dbtest
	    (user=PDAMREAD orapw="&orpass" path=&dbpth connection=global);

	    create table subject as select * from connection to dbtest
	      (
	       select distinct a.subjectid, b.sitecountry as country, b.sitemnemonic as sitenbr, 
		 		  a.subjectnumberstr as subjnbr, b.sascorressnumit as screennbr
	         from &protocol.&id2..irv_cur_subject a, &protocol&id2..cv_safm b
	        where a.subjectid = b.subjectid
/*			  and instr(a.subjectnumberstr,'--')>0*/          /*Randomized Olny*/
	        order by a.subjectid
	       );

	    create table dov as select * from connection to dbtest
		    (
		     select distinct subjectid, visitid, visitmnemonic, FORMMNEMONIC, dt_dov, dt_dov as DT, dovserrorvcb_dovserrorvsc__1 as err_visit 
			 	from &protocol&id2..cv_dovfm
			  where 1 = 1 order by subjectid, visitid
		    );

	    select distinct catt("'",formname,"'") into :allform separated by ',' from global_supp;
		%put &allform;
	    create table rd_datadictionary as select * from connection to dbtest
		    (
		     select distinct formrefname,viewname, itemquestion, columnname 
			   from &protocol.&id2..cv_datadictionary 
		   	  where formrefname in (&allform)
	          order by formrefname
		    );



/*PROC PRINT DATA=rd_datadictionary;*/
/*RUN;*/
/*ENDSAS;*/

         
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
		/* V7 update - Change in date of intial identification as per update in Spec*/
		if COMPRESS(upcase(compbl(itemquestion)),,'d') in ('DATE OF INITIAL IDENTIFICATION') and prefix='DT' and controllevel = '1' then do;
	         item_alias = 'DT_LS';
	    end;
		/* V8 update - to remove Lesion Category as it is generalized to item question 'Tumor Identification' in LSN Supp */
		else if upcase(compbl(itemquestion)) in ('TUMOR IDENTIFICATION') and prefix='CD' and controllevel = '1' then do; 
			item_alias = 'LS_TYPE';
		end;
		else if upcase(strip(form_alias))in('SR','SRIVRS') and upcase(compbl(itemquestion)) in ('DATE OF ASSESSMENT') and prefix='DT' and controllevel = '1' then do; 
			item_alias = 'dt';
			form_alias = 'SS';
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
			%if   &&formalias&i ne SS %then %do;
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
			  %else %do;
			  	create table &&formalias&i.._&i as select * from connection to dbtest
						(select &&columnlst&i,FORMIDX_m,0 as ITEMSETIDX_a
		                   from ( select ma.*,&&mformidx&i, &&mdeletedform&i from &protocol.&id2..&&viewmain&i ma) m 
						  where coalesce(DELETEDFORM_m, 'N') = 'N' 
						);
			  %end;

			%end;
			disconnect from dbtest;
		quit;

		%do i = 1 %to &ecrf_nbr;
				data LS_all;
				    set lsn_:;
				run;
		%end; 

    %end;

	%do i = 1 %to &ecrf_nbr;
		%movetable(lsn_&i);
	%end;

	%mend;
	%gdataset;
%*4. --- Define treatment phas*;

	data sr;
	set ss_:;
	run;



/*PROC PRINT DATA = sr;*/
/*WHERE SUBJECTID IN (178350,446448);*/
/*RUN;*/
/*ENDSAS;*/

PROC SORT DATA=sr;
BY SUBJECTID VISITID;
RUN;

PROC SORT DATA=DOV;
BY SUBJECTID VISITID ;
RUN;

DATA sr;
MERGE DOV(IN=A) sr(IN=B);
BY SUBJECTID VISITID;
IF B and err_visit='';
RUN;




/*PROC PRINT DATA = sr;*/
/*WHERE SUBJECTID IN (178350,446448);*/
/*RUN;*/
/*ENDSAS;*/


  proc sql;




		create table dov_supp0 as
		select dov.*,tporder,tpname from dov, phase_csv supp
		where strip(upper(VISITMNEMONIC))=strip(supp.tpvisit)
		and err_visit is missing;

		create table doa_supp as
		select distinct dov.subjectid,dov.visitid,dov.visitmnemonic, FORMMNEMONIC, tporder, DT , form, window, type,doa from dov_supp0 dov, supp
		where not missing(dt)
		and case when (upcase(strip(supp.doa)) ne 'NA' or not missing(supp.doa)) and upcase(strip(supp.doa))=strip(FORMMNEMONIC)
  /* V7 update - to cosider sr or dov date as per treatment phase , just joined with treatment phase*/
         and upcase(strip(supp.period))=upper(strip(tpname))               then 1
		else 0
		end=1
       
union 
		select distinct s.subjectid,s.visitid,supp1.tpvisit, s.FORMMNEMONIC,'1' as tporder,DT,form ,window, type,doa from sr s, supp, phase_csv supp1    
		where not missing(dt)
		/* V7 update - to cosider sr or dov date as per treatment phase*/
		/* V8 update - to remove joing based on visitmnemonic for SR from to consider SR form from any visit*/
/*		and strip(upper(s.VISITMNEMONIC))=strip(upper(supp1.tpvisit)) */
and upcase(strip(supp.period))=upper(strip(supp1.tpname)) 
		and case when (upcase(strip(supp.doa)) ne 'NA' or not missing(supp.doa)) and upcase(strip(supp.doa))=strip(s.FORMMNEMONIC) then 1
		else 0
		end=1

         ;


		create table lsn_supp as 
		select distinct Ls_all.*, doa from Ls_all, supp
		where strip(Ls_all.FORMMNEMONIC)=strip(upcase(form))  
	;



quit;



/*5. main logic */
/*logic 1*/
   
	proc sql;
	create table logic1 as
	select doa.*,doa.tporder,'Scenario 1' as Scenario from 
	(select * from doa_supp where not missing(DT)) doa left join lsn_supp ls
	on ls.subjectid=doa.subjectid
	and strip(doa.doa)=strip(upcase(ls.doa))
	and strip(ls.FORMMNEMONIC)=strip(upcase(doa.form))
	where missing(ls.subjectid)
	;
	quit;

	/*logic 2*/
	proc sql noprint;
	select count(tporder) into: tp from phase_csv;
	quit;

	%put &tp;
	%let i=1;
	%do i=1 %to &tp;

	data doa_supp_&i;
	set doa_supp;
	where tporder="&i";
	run;

	proc sql;
	create table logic2_&i as 
	select distinct a.subjectid,a.visitid,a.visitmnemonic,a.FORMMNEMONIC,a.dt, a.form, a.window, a.type, 'Scenario 2' as Scenario from
	doa_supp_&i a left join lsn_supp ls
	on ls.subjectid=a.subjectid
	and datepart(dt_ls)>= datepart(a.DT)-input(a.window,best12.)
	and datepart(dt_ls)<= datepart(a.DT)
	and case when strip(type) ne 'NA' and upcase(strip(ls_type)) in (select distinct upcase(strip(type)) from supp) then 1
	    when strip(type) = 'NA' then 1
		else 0
	end=1
	and strip(ls.doa)=strip(upcase(a.doa))
	and strip(ls.FORMMNEMONIC)=strip(upcase(a.form))
	where missing(ls.subjectid)
	;
	quit;
	%end;
	data logic2;
	set logic2_:;
	run;


/*PROC PRINT DATA = LOGIC2;*/
/*RUN;*/
/*ENDSAS;*/


	data final;
	set logic1 logic2;
	run;

	proc sort data=final;
	by subjectid;
	run;


/*	PROC PRINT DATA = final;*/
/*RUN;*/
/*ENDSAS;*/

%* --- 5. Final Dataset with subdataset filter  --- *;
%subdataset(subject);

proc sql;
	create table finalall as 
		select distinct country, SITENBR, subjnbr, f.*  
			from subject s inner join final f
				on s.subjectid = f.subjectid;
quit;



/*data finalall;*/
/*set finalall;*/
/*DT=datepart(DT);*/
/*format DT best12.;*/
/*format DT  date9.;*/
/*run;*/





proc sort data = finalall nodupkey;
	by country SITENBR subjnbr form visitmnemonic FORMMNEMONIC Scenario;
run;


%* --- 6. Generate output to Excel --- *;
%obscnt(finalall);

%if &nobs=0 %then
	%do;
		ods tagsets.excelxp  
			%if &putfil=NON %then &putfilnm;
		options ( embedded_titles        =  'yes'
			embedded_footnotes     =  'yes'
			print_footer           =  'Page &amp;P of &amp;N'
			sheet_name             =  'onc_lsn_012_jr_std'
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

	%end;
%else
	%do;
		ods tagsets.excelxp
			%if &putfil=NON %then &putfilnm;
		options ( embedded_titles        =  'yes'
			embedded_footnotes     =  'yes'
			print_footer           =  'Page &amp;P of &amp;N'
			sheet_name             =  'onc_lsn_012_jr_std'
			orientation            =  'landscape'
			absolute_column_width  =  '20,10,15,15,30,10,20');
		options formchar='|_' missing=' ' pageno=1 nobyline ls=150;
		title7	&titleformat "# of rows for Supporting Doc: &cnt_list";
		title7	&titleformat "Supporting Doc Page: &supppage";

		proc report data=finalall headline headskip spacing=1 split='*' missing
			style(report)={just=center font_face=times   font_size=1 cellspacing=2 borderwidth=2 background=white}
			style(header)={vjust=top   font_face=verdana font_size=2 font_weight=bold cellheight = 22 background=#7c98B0 
			foreground = white htmlstyle="text-align:center"}
			style(column)={just=center font_face=calibri background=white htmlstyle="text-align:center"};
			column country SITENBR subjnbr form visitmnemonic FORMMNEMONIC Scenario;
			define country			/ display   width=20 'Country'	flow;
			define SITENBR       / display   width=10 'Site' style(column)={tagattr='format:@'};
			define subjnbr       / display	width=15 'Subject Number' style(column)={tagattr='format:@'};
			define form		/ display width=15 'Lesion Evaluation Form' flow;
			define visitmnemonic		/ display	width=30 'Related First Visit Treatment Phase' flow;
			define FORMMNEMONIC		/ display	width=10 'eCRF' flow;
/*			define dt		/ display	width=30 'Date of Assessment eCRF' flow;*/
			define Scenario	/ display	width=20 'Scenario' flow;

		run;

	%end;

%if &supppage = Y %then
	%do;
		ods tagsets.excelxp  
			options ( embedded_titles        =  'yes'
			embedded_footnotes     =  'yes'
			print_footer           =  'Page &amp;P of &amp;N'
			sheet_name             =  'onc_lsn_012_jr_std_supp_doc'
			orientation            =  'landscape'
			absolute_column_width  =  '5,20,20,10,50');

		data supp;
			%if &cnt_list eq 0 %then
				%do;
					if _n_ = 1 then
						output;
					set supp;
					output;
				%end;
			%else
				%do;
					set supp;
					output;
				%end;
		run;

		options formchar='|_' missing=' ' pageno=1 nobyline ls=150;
		title6	&titleformat "# of rows for Supporting Doc: &cnt_list";
		title7	&titleformat "Supporting Doc Page: &supppage";

		proc report data=supp headline headskip spacing=1 split='*' missing
			style(report)={just=center font_face=times   font_size=1 cellspacing=2 borderwidth=2 background=white}
			style(header)={vjust=top   font_face=verdana font_size=2 font_weight=bold cellheight = 22 background=#7c98B0 
			foreground = white htmlstyle="text-align:center"}
			style(column)={just=center font_face=calibri background=white htmlstyle="text-align:center"};
			column  form period window type doa;

			define form      / display   width=20 'LSN eCRF' flow;
			define period      / display   width=20 'Treatment Phase' flow;
            define window	/ display 	width=10 'Window of days' flow;
			define type	/ display 	width=20 'Lesion Type ' flow;
			define doa	/ display 	width=20 'Date of Assessment eCRF' flow;			
		run;

	%end;
%end;
%end;

%let putfil=YES;
ods tagsets.excelxp close;

%deletall;
run;

%mend onc_lsn_012_jr_std;
