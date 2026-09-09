/*************************************************************************************************;
%*************************************************************************************************;
%* Report Description:                                                                            ;
%* This report will list subjects that have discrepancies between Lesion evaluation "schedule     ;
%* time" and its corresponding oncologic response "schedule time" and Oncologic scan "schedule    ;
%* time".                                                                                         ;
%*************************************************************************************************;
%* Report Logic:                                                                                  ;
%* (Logic 1.1: LSN.  Scheduled time  <> RSP.  Scheduled time                                      ;
%* AND                                                                                            ;
%* Logic 1.2:  Date of Lesion Evaluation  =  RSP. Date Response Determined                        ;
%* )                                                                                              ;
%* OR                                                                                             ;
%* (Logic 1.3 LSN.  Scheduled time  <> ORAJ. Scheduled Time                                       ;
%* AND                                                                                            ;
%* Logic 1.4:  Date of Lesion Evaluation  = ORAJ.Date of Assessment (Scan/Image/Physical Exam)    ;
%* )                                                                                              ;
%* Logic 2:                                                                                       ;
%* (Logic 2.1: OSCN. Scheduled Time <> RSP.  Scheduled Time                                       ;
%* AND                                                                                            ;
%* Logic 2.2: OSCN. Scan Date = RSP. Date Response Determined                                     ;
%* )                                                                                              ;
%* OR                                                                                             ;
%* (Logic 2.3: OSCN. Scheduled Time <> ORAJ. Scheduled Time                                       ;
%* AND                                                                                            ;
%* Logic 2.4: OSCN. Scan Date = ORAJ.Date of Assessment (Scan/Image/Physical Exam)                ;
%* )                                                                                              ;
%* Logic 3:                                                                                       ;
%* Logic 3.1: LSN.Date of Initial Identification = LSN.Date of Lesion Evaluation time             ;
%* AND                                                                                            ;
%* Logic 3.2: LSN. Scheduled time  <> OSCN.  Scheduled                                            ;
%* AND                                                                                            ;
%* Logic 3.3: LSN.Date of Initial Identification = OSCN.Scan Date                                 ;
%* Notes:                                                                                         ;
%* Note 1: Exclude deleted records.                                                               ;
%* Note 2: The report will use master supporting documents LSN_supp_doc and RSP_supp_doc. These   ;
%* supporting documents should be uploaded only once at TA level per the GDO Oncology TAST        ;
%* authorized members and will be used to facilitate programming of the report. Report builder    ;
%* will use all the columns provided in the excel spreadsheet to create the programming code.     ;
%* Note 3: The distribution of items are as follows:                                              ;
%* - "Date of Lesion Evaluation , "Date of Initial Identification ", LSN.  Scheduled Time  belong ;
%* to LSN_supp_doc                                                                                ;
%* -  Date Response Determined , RSP.  Scheduled Time  belongs to RSP_supp_doc                    ;
%* Note 4: If OSCN  Scheduled Time  is not present in the study, please do not consider Scenario 2;
%*  and Scenario 3 and run only Scenario 1.                                                       ;
%*************************************************************************************************;
%* Program Flow:                                                                                  ;
%* 1. Global supporting document                                                                  ;
%* 2. Manage itemquestion according to spec and forms based on study                              ;
%* 3. Final Dataset with subdataset filter														  ;
%* 4. Generate output to Excel																	  ;
%*************************************************************************************************;
%* Macros Used:                                                                                   ;
%* gdmsrpt_macros                                                                                 ;
%*************************************************************************************************;
%* Revision History:                                                                              ;
%* 	Version 1: Initial version. 																  ;
%* 	Version 2: No update to logic or layout. Programming update.      							  ;
%* 	Version 3: LSNRN and ORRN forms added. New scenario included into report's logic to ensure	  ;
%* 	OSCN Scheduled Time is the same for corresponding oncologic response form.					  ;
%*	Version 4: Programming update  																  ;
%*	Version 5: Master LSN_Supp and RSP_Supp included in the spec and note added for studies 	  ;
%* 	without OSCN. 																				  ;
%*	Version 6: Code update to fix issue of schedule time mismatch,no update to logic or layout.   ;
%* 	[Danny Fang - 29Sep2022]    																  ;
%*	Version 7: Code update to fix issue of RSP.schedule time invalid data type, no update to 	  ;
%*  logic or layout.  [Danny Fang - 10Nov2022]    												  ;
%*  Version 8: Code update due to global supporting doc update.  [Danny Fang - 09Mar2023]         ;
%*  Version 9: Logic 3 added for baseline lesion evaluations.   [Danny Fang - 30May2023]          ;
%*************************************************************************************************;
*/
%macro onc_lsn_011_jr_std;
 
%let checkid = %upcase(onc_lsn_011_jr_std);
%let vernum = 9;
%let reptitle=Schedule time reconciliation between Lesion evaluation, oncologic response and Oncologic scan; 
%let repdesc=This report will list subjects that have discrepancies between Lesion evaluation 'schedule time';
 
%gdmsrptheader;
%orasetup;
 
footnote3 &footformat "and its corresponding oncologic response 'schedule time' and Oncologic scan 'schedule time'.";
 
%* --- 1. Global supporting document --- *;
filename supp "/cdm/prod/extfiles/Supp_Docs/OTHER_GLOBAL_SUPP/LSN_supp_doc.csv";
/*		 filename supp "C:\Users\fangda\Downloads\Supp doc\LSN_supp_doc.csv";*/
 
data g_lsn_supp;
format viewname $50. original_itemquestion $200. itemquestion $200. controllevel $10. columnname $200. prefix $10.;
infile supp missover pad DSD delimiter = ',' firstobs=2;
input viewname original_itemquestion  itemquestion controllevel columnname prefix;
if missing(_INFILE_) then delete;
if upcase(strip(itemquestion)) in ('SCHEDULED TIME','DATE OF LESION EVALUATION','DATE OF INITIAL IDENTIFICATION');
if upcase(strip(prefix)) in ('DT','CD');
form_alias='LSN';
run;

 
filename supp "/cdm/prod/extfiles/Supp_Docs/OTHER_GLOBAL_SUPP/RSP_supp_doc.csv";
/*        filename supp "C:\Users\fangda\Downloads\Supp doc\RSP_supp_doc.csv";*/

data g_rsp_supp;
format viewname $50. original_itemquestion $200. itemquestion $200. controllevel $10. columnname $200. prefix $10.;
infile supp missover pad DSD delimiter = ',' firstobs=2;
input viewname original_itemquestion  itemquestion controllevel columnname prefix;
if missing(_INFILE_) then delete;
if upcase(strip(itemquestion)) in ('SCHEDULED TIME','DATE RESPONSE DETERMINED');
if upcase(strip(prefix)) in ('DT','CD');
form_alias='RSP';
run;
 
data global_supp;
format formname $50. viewname $50. original_itemquestion $200. itemquestion $200. controllevel $10. columnname $200. prefix $10.;
set g_lsn_supp g_rsp_supp;
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
 
insert into global_supp
		values('ORAJFM','CV_ORAJFM','SCHEDULED TIME','SCHEDULED TIME','1','ORAJLSTPTIT','CD','ORAJ')
		values('ORAJFM','CV_ORAJFM','DATE OF ASSESSMENT (SCAN/IMAGE/PHYSICAL EXAM)','DATE OF ASSESSMENT (SCAN/IMAGE/PHYSICAL EXAM)','1','DT_ORAJRSDTCIT','DT','ORAJ')
		values('OSCNFM','CV_OSCNFM','SCHEDULED TIME','SCHEDULED TIME','1','OSCNPRTPTIT','CD','OSCN')
  		values('OSCNFM','CV_OSCNFM','SCAN DATE','SCAN DATE','1','DT_OSCNPRSTDTCIT','DT','OSCN')
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
 
%* --- 2.2 Assign form/item alias based on itemquestion and form based on report design ---*;
data study_supp_alias (keep=formname viewname columnname item_alias form_alias mformidx mdeletedform aitemsetidx adeletedform adeleteditem);
		set studyfm;
		format item_alias $50. form_alias $50.;
		if upcase(strip(form_alias))='LSN' and upcase(compbl(itemquestion)) in ('SCHEDULED TIME') and prefix='CD' and controllevel = '2' and index(strip(columnname), 'NUM') = 0 then do; 
	         item_alias = 'lsn_sche';
	    end;
		else if upcase(strip(form_alias))='LSN' and upcase(compbl(itemquestion)) in ('DATE OF LESION EVALUATION') and prefix='DT' and controllevel = '1' then do; 
			item_alias = 'lsn_dt';
		end;
		else if upcase(strip(form_alias))='LSN' and upcase(compbl(itemquestion)) in ('DATE OF INITIAL IDENTIFICATION') and prefix='DT' and controllevel = '1' then do; 
			item_alias = 'lsn_dt_ini';
		end;
		else if upcase(strip(form_alias))='RSP' and upcase(compbl(itemquestion)) in ('SCHEDULED TIME') and prefix='CD' and controllevel = '1' and index(strip(columnname), 'NUM') = 0 then do; 
			item_alias = 'rsp_sche';
		end;
		else if upcase(strip(form_alias))='RSP' and upcase(compbl(itemquestion)) in ('SCHEDULED TIME') and prefix='CD' and controllevel = '2' and index(strip(columnname), 'NUM') = 0  then do; 
			item_alias = 'rsp_sche_2';
		end;
		else if upcase(strip(form_alias))='RSP' and upcase(compbl(itemquestion)) in ('DATE RESPONSE DETERMINED') and prefix='DT' and controllevel = '1' then do; 
			item_alias = 'rsp_dt';
		end;
		else if upcase(strip(form_alias))='ORAJ' and upcase(compbl(itemquestion)) in ('SCHEDULED TIME') and prefix='CD' and controllevel = '1' then do; 
			item_alias = 'oraj_sche';
		end;
		else if upcase(strip(form_alias))='ORAJ' and upcase(compbl(itemquestion)) in ('DATE OF ASSESSMENT (SCAN/IMAGE/PHYSICAL EXAM)') and prefix='DT' and controllevel = '1' then do; 
			item_alias = 'oraj_dt';
		end;
        else if upcase(strip(form_alias))='OSCN' and upcase(compbl(itemquestion)) in ('SCHEDULED TIME') and prefix='CD' and controllevel = '1' then do;
			item_alias = 'oscn_sche';
		end;
		else if upcase(strip(form_alias))='OSCN' and upcase(compbl(itemquestion)) in ('SCAN DATE') and prefix='DT' and controllevel = '1' then do;
			item_alias = 'oscn_dt';
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
columnlst='m.subjectid,m.visitid,m.visitmnemonic,m.formid,m.formmnemonic';
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
if eof then        call symput('ecrf_nbr',_n_);
run;
%obscnt(dic_all);
%let dic_cnt = &nobs;

 
    %* --- 2.4 Get Study form data based on report design ---*;
data lsn_0;
format subjectid best12. visitid best12. visitmnemonic $4000. formid best12. formmnemonic $100. formidx_m best12. itemsetidx_a best12. 
               lsn_sche $1000. lsn_dt datetime20. lsn_dt_ini datetime20.  ;
	stop;
	run;

data rsp_0;
format subjectid best12. visitid best12. visitmnemonic $4000. formid best12. formmnemonic $4000. formidx_m best12. itemsetidx_a best12. 
        	   rsp_sche $1000. rsp_sche_2 $1000.  rsp_dt datetime20. ;
	stop;
	run;

data oraj_0;
format subjectid best12. visitid best12. visitmnemonic $4000. formid best12. formmnemonic $4000. formidx_m best12. itemsetidx_a best12. 
		       oraj_sche $1000. oraj_dt datetime20.;
	stop;
	run;

data oscn_0;
format subjectid best12. visitid best12.  visitmnemonic $4000. formid best12. formmnemonic $4000. formidx_m best12. itemsetidx_a best12. 
		       oscn_sche $1000.  oscn_dt datetime20.;
	stop;
	run;

	%macro movetable(table);
		proc delete data=&table;
		run;
	%mend;

	%macro gdataset;
	%GLOBAL lsnformdis;
	%GLOBAL rspformdis;
	%GLOBAL scenariodis;

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




data rsp;
set rsp_:;
%if %length(&rspform) gt 0  %then %do;
    %let rspformdis = %sysfunc(upcase(&rspform));
%let rspformlist = %sysfunc(catq(1ac,&rspformdis));
where formmnemonic in (&rspformlist);
%end;
%else %do;
%let rspformdis = All;
            %end;        
run;


data oraj;
set oraj_:;    
run;

data oscn;
set oscn_:;    
run;

    %end;
 
%do i = 0 %to &ecrf_nbr;

%movetable(lsn_&i);
%movetable(rsp_&i);
%movetable(oraj_&i);
%movetable(oscn_&i);

%end;
 
%mend;
%gdataset;

data lsn(drop=lsn_dt lsn_dt_ini);
set lsn;
format lsn_dt_col date9. lsn_ini_col date9.;
lsn_dt_col = datepart(lsn_dt);
lsn_ini_col = datepart(lsn_dt_ini);
if not missing(lsn_dt_col);
run;


data rsp(drop=rsp_dt);
set rsp;
format rsp_dt_col date9.;
rsp_dt_col = datepart(rsp_dt);
if not missing(rsp_dt_col);
run;


data oscn(drop=oscn_dt);
set oscn;
format oscn_dt_col date9.;
oscn_dt_col = datepart(oscn_dt);
if not missing(oscn_dt_col);
run;


data oraj(drop=oraj_dt);
set oraj;
format oraj_dt_col date9.;
oraj_dt_col = datepart(oraj_dt);
if not missing(oraj_dt_col);
run;


proc sql;
	create table lsn_f as
	select subjectid,
		   visitid,
		   visitmnemonic,
		   formid,
		   formmnemonic,
		   formidx_m,
		   itemsetidx_a,
		   lsn_sche as lsn_sche_col,
		   lsn_dt_col,
		   lsn_ini_col
	from lsn
		where lsn_sche is not null;
quit;



proc sql;
	create table rsp_f as
	select subjectid,
		   visitid,
		   visitmnemonic,
		   formid,
		   formmnemonic,
		   formidx_m,
		   itemsetidx_a,
		   case when index(upper(trim(rsp_sche)),'OTHER') = 0 and upper(trim(rsp_sche)) not like '%TPTPD'
		   			then upper(trim(rsp_sche))
				when index(upper(trim(rsp_sche)),'OTHER') > 0
					then upper(trim(rsp_sche_2))
				when upper(trim(rsp_sche)) like '%TPTPD'
					then upper(trim(rsp_sche_2))
			else '' end as rsp_sche_col,
		   rsp_dt_col
	from rsp
		where rsp_sche is not null or rsp_sche_2 is not null;
quit;



%* --- 3. Final Dataset with subdataset filter  --- *;        
 
%subdataset(subject);

 
proc sql;
	create table lsn_rsp as
	select s.subjectid,
		   s.formmnemonic as lsn_form,
		   case when s.itemsetidx_a ne 0 then strip(put(s.formidx_m,10.))||'('||strip(put(s.itemsetidx_a,10.))||')' 
		   		else strip(put(s.formidx_m,10.)) end as lsn_seq,
		   s.lsn_dt_col as lsn_dt format date9.,
		   s.lsn_ini_col as lsn_ini format date9.,
		   s.lsn_sche_col as lsn_sche,
		   '' as oscn_form,
		   '' as oscn_seq,
		   . as oscn_dt format date9.,
		   '' as oscn_sche,
		   r.formmnemonic as rsp_form,
		   case when r.itemsetidx_a ne 0 then strip(put(r.formidx_m,10.))||'('||strip(put(r.itemsetidx_a,10.))||')' 
		   		else strip(put(r.formidx_m,10.)) end as rsp_seq,
		   r.rsp_dt_col as rsp_dt format date9.,
		   r.rsp_sche_col as rsp_sche,
		   'Scenario 1' as scenario 
	from lsn_f s,
		 rsp_f r
	where s.subjectid=r.subjectid
	and compress(upper(trim(lsn_sche_col))) ne compress(upper(trim(rsp_sche_col)))
	and lsn_dt_col eq rsp_dt_col
union
	select s.subjectid,
		   s.formmnemonic as lsn_form,
		   case when s.itemsetidx_a ne 0 then strip(put(s.formidx_m,10.))||'('||strip(put(s.itemsetidx_a,10.))||')' 
		   		else strip(put(s.formidx_m,10.)) end as lsn_seq,
		   s.lsn_dt_col as lsn_dt format date9.,
		   s.lsn_ini_col as lsn_ini format date9.,
		   s.lsn_sche_col as lsn_sche,
		   '' as oscn_form,
		   '' as oscn_seq,
		   . as oscn_dt format date9.,
		   '' as oscn_sche,
		   r.formmnemonic as rsp_form,
		   case when r.itemsetidx_a ne 0 then strip(put(r.formidx_m,10.))||'('||strip(put(r.itemsetidx_a,10.))||')' 
		   		else strip(put(r.formidx_m,10.)) end as rsp_seq,
		   r.oraj_dt_col as rsp_dt format date9.,
		   r.oraj_sche as rsp_sche,
		   'Scenario 1' as scenario 
	from lsn_f s,
		 oraj r
	where s.subjectid=r.subjectid
	and compress(upper(trim(lsn_sche_col))) ne compress(upper(trim(oraj_sche)))
	and lsn_dt_col eq oraj_dt_col;

quit;


proc sql;
	create table oscn_rsp as
	select s.subjectid,
		   '' as lsn_form,
		   '' as lsn_seq,
		   . as lsn_dt format date9.,
		   . as lsn_ini format date9.,
		   '' as lsn_sche,
		   s.formmnemonic as oscn_form,
		   case when s.itemsetidx_a ne 0 then strip(put(s.formidx_m,10.))||'('||strip(put(s.itemsetidx_a,10.))||')' 
		   		else strip(put(s.formidx_m,10.)) end as oscn_seq,
		   s.oscn_dt_col as oscn_dt format date9.,
		   s.oscn_sche as oscn_sche,
		   r.formmnemonic as rsp_form,
		   case when r.itemsetidx_a ne 0 then strip(put(r.formidx_m,10.))||'('||strip(put(r.itemsetidx_a,10.))||')' 
		   		else strip(put(r.formidx_m,10.)) end as rsp_seq,
		   r.rsp_dt_col as rsp_dt format date9.,
		   r.rsp_sche_col as rsp_sche,
		   'Scenario 2' as scenario 
	from oscn s,
		 rsp_f r
	where s.subjectid=r.subjectid
	and compress(upper(trim(oscn_sche))) ne compress(upper(trim(rsp_sche_col)))
	and oscn_dt_col eq rsp_dt_col
union
	select s.subjectid,
		   '' as lsn_form,
		   '' as lsn_seq,
		   . as lsn_dt format date9.,
		   . as lsn_ini format date9.,
		   '' as lsn_sche,
		   s.formmnemonic as oscn_form,
		   case when s.itemsetidx_a ne 0 then strip(put(s.formidx_m,10.))||'('||strip(put(s.itemsetidx_a,10.))||')' 
		   		else strip(put(s.formidx_m,10.)) end as oscn_seq,
		   s.oscn_dt_col as oscn_dt format date9.,
		   s.oscn_sche as oscn_sche,
		   r.formmnemonic as rsp_form,
		   case when r.itemsetidx_a ne 0 then strip(put(r.formidx_m,10.))||'('||strip(put(r.itemsetidx_a,10.))||')' 
		   		else strip(put(r.formidx_m,10.)) end as rsp_seq,
		   r.oraj_dt_col as rsp_dt format date9.,
		   r.oraj_sche as rsp_sche,
		   'Scenario 2' as scenario 
	from oscn s,
		 oraj r
	where s.subjectid=r.subjectid
	and compress(upper(trim(oscn_sche))) ne compress(upper(trim(oraj_sche)))
	and oscn_dt_col eq oraj_dt_col;

quit;


proc sql;
	create table lsn_oscn as
	select s.subjectid,
		   s.formmnemonic as lsn_form,
		   case when s.itemsetidx_a ne 0 then strip(put(s.formidx_m,10.))||'('||strip(put(s.itemsetidx_a,10.))||')' 
		   		else strip(put(s.formidx_m,10.)) end as lsn_seq,
		   s.lsn_dt_col as lsn_dt format date9.,
		   s.lsn_ini_col as lsn_ini format date9.,
		   s.lsn_sche_col as lsn_sche,
		   r.formmnemonic as oscn_form,
		   case when r.itemsetidx_a ne 0 then strip(put(r.formidx_m,10.))||'('||strip(put(r.itemsetidx_a,10.))||')' 
		   		else strip(put(r.formidx_m,10.)) end as oscn_seq,
		   r.oscn_dt_col as oscn_dt format date9.,
		   r.oscn_sche as oscn_sche,
		   '' as rsp_form,
		   '' as rsp_seq,
		   . as rsp_dt format date9.,
		   '' as rsp_sche,
		   'Scenario 3' as scenario 
	from lsn_f s,
		 oscn r
	where s.subjectid=r.subjectid
	and compress(upper(trim(lsn_sche_col))) ne compress(upper(trim(oscn_sche)))
	and lsn_dt_col eq lsn_ini_col 
	and lsn_ini_col eq oscn_dt_col
	;
	quit;




proc sql;
	create table all as 
	select * from lsn_rsp
	union
	select * from oscn_rsp
	union
	select * from lsn_oscn
;
quit;





%macro abc;
data final;
set all;
%if &scenario=s1 %then %do;
 %let scenariodis =Scenario 1; 
where upcase(strip(scenario))='SCENARIO 1';
%end;
%else %if &scenario=s2 %then %do;
%let scenariodis =Scenario 2;
where upcase(strip(scenario))='SCENARIO 2';
%end;
%else %if &scenario=s3 %then %do;
%let scenariodis =Scenario 3;
where upcase(strip(scenario))='SCENARIO 3';
%end;
%else %do;
%let scenariodis = All;
%end;
run; 

%mend;
%abc;



proc sort data=final;
by subjectid;
run;        
 
data final;
merge final(in=a) subject(in=b);
by subjectid;
if a and b;
run;

 
proc sort data = final nodupkey;
by country sitenbr subjnbr lsn_form lsn_seq lsn_dt lsn_sche oscn_form oscn_seq oscn_dt oscn_sche rsp_form rsp_seq rsp_dt rsp_sche scenario;
run;
 
%* --- 4. Generate output to Excel --- *;
 

%obscnt(final);
	%if &nobs=0 %then %do; 

		ods tagsets.excelxp  
		%if &putfil=NON %then &putfilnm;  
			options ( embedded_titles        =  'yes'
					  embedded_footnotes     =  'yes'
					  print_footer           =  'Page &amp;P of &amp;N'
					  sheet_name             =  'onc_lsn_011_jr_std'
					  orientation            =  'landscape'
					  absolute_column_width  =  '100');

		options formchar='|_' missing=' ' pageno=1 nobyline ls=200;

	title6 "LSN Form : &lsnformdis";
	title7 "RSP Form : &rspformdis";
	title8 "Scenario : &scenariodis";



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
                  sheet_name             =  'onc_lsn_011_jr_std'
                  orientation            =  'landscape'
                  absolute_column_width  =  '15,10,15,10,10,15,15,10,10,15,15,10,10,15,15,10');
				  
		options formchar='|_' missing=' ' pageno=1 nobyline ls=180;

	title6 "LSN Form : &lsnformdis";
	title7 "RSP Form : &rspformdis";
	title8 "Scenario : &scenariodis";

	proc report data=final headline headskip spacing=1 split='*' missing
		style(report)={just=center font_face=times   font_size=1 cellspacing=2 borderwidth=2 background=white}
		style(header)={vjust=top   font_face=verdana font_size=2 font_weight=bold cellheight = 22 background=#7c98B0 
			foreground = white htmlstyle="text-align:center"}
		style(column)={just=center font_face=calibri background=white htmlstyle="text-align:center"};
	column country sitenbr subjnbr lsn_form lsn_seq lsn_dt lsn_sche oscn_form oscn_seq oscn_dt oscn_sche rsp_form rsp_seq rsp_dt rsp_sche scenario; 
	define country			/ display   width=15 'Country'	flow;
	define sitenbr       / display   width=10 'Site' style(column)={tagattr='format:@'};
	define subjnbr       / display	width=15 'Subject Number' style(column)={tagattr='format:@'};
	define lsn_form    	/ display	width=10 'Lesion Form'; 	
	define lsn_seq			/ display	width=10 'Lesion Seq #';
	define lsn_dt				/ display	width=15 'Lesion Date';
	define lsn_sche  	    / display	width=15 'Lesion Scheduled Time' flow; 
	define oscn_form    	/ display	width=10 'Scan Form'; 	
	define oscn_seq			/ display	width=10 'Scan Seq #';
	define oscn_dt				/ display	width=15 'Scan Date';
	define oscn_sche  	    / display	width=15 'Scan Scheduled Time' flow; 	
	define rsp_form			/ display	width=10 'RSP Form';
	define rsp_seq   			/ display	width=10 'RSP Seq #';
	define rsp_dt   		/ display	width=15 'RSP Date Response Determined';
	define rsp_sche   			/ display	width=15 'RSP Scheduled Time' flow;
	define scenario   			/ display	width=10 'Scenario';
	run;			

%end;


%let putfil=YES;
ods tagsets.excelxp close; 

%deletall;
run;
 
%mend onc_lsn_011_jr_std;

