*********************************************************************************;

* Description:                                                                   ;
* Treatment discontinuation due to CP but PD reported on the Oncologic Response eCRF.;
*********************************************************************************;
* Revision History:                                                              ; 
* Version 1 - Initial Version                                                    ;
* Version 2 - [Allabaksh Karajgi]PMST form added                                 ;
* Macro used:  ;
* gdmsrptheader subdataset deletall ;
* - Note 4 deleted, Note 1 added, Logic aligned with global supporting document RSP.
    Logic aligned with study_phase supp doc. Parameter RSP Form added and Study Phase Page added
* Version 3 - [Saurabh Sanjay Bamb] 
*Note 4 deleted, Note 1 added, Logic aligned with global supporting document RSP. 
 Logic aligned with study_phase supp doc. Parameter RSP Form added and Study Phase Page added.
* Version 4 - [Saurabh Sanjay Bamb] 
* Report not working for trial containing both pms1 and pmst form;
*select viewname into:pname seperated by ' ' from  TNAME added;

*********************************************************************************;
/*MK3475-048*/

%macro onc_pms1_004_jr_std;

options symbolgen mprint mlogic;
%global checkid prot; 
%let vernum = 4;
%let reptitle=Treatment discontinuation due to CP but PD reported on the Oncologic Response eCRF; 
%let repdesc=This report will output if pt. discontinued treatment due to Clinical Progression but there are Overall Response as Progressive Disease reported;
%let checkid=%upcase(ONC_PMS1_004_JR_STD);
%let prot=%upcase(&protocol);
%let just = center;
%gdmsrptheader;


%orasetup;

/*%* --- 5. Deal with treatment phase --- *;*/
/*   */
%if %sysfunc(fileexist(/cdm/prod/extfiles/Supp_Docs/STUDY_PHASE_SUPP/study_phase_supp_&prot..csv)) = 0 %then
		%do;

			data _null_;
				file print;
				put #10 @10 "ONC_PMS1_004_JR_STD Supporting Document Not Present for This Trial";
				put #12 @10 "Please check the DRP for Details and Contact your RaM Programmer for Assistance";
			run;

		%end;
	%else
		%do;

	filename supp "/cdm/prod/extfiles/Supp_Docs/STUDY_PHASE_SUPP/study_phase_supp_&prot..csv";
/*	filename supp "C:\Users\dongluy\Downloads\Supp_Docs\study_phase_supp_&prot..csv";*/

	data phase_csv;
		format tporder $10. tpname $100. tpvisit $100. ;
		infile supp missover pad DSD delimiter = ',' firstobs=2;
		input tporder tpname tpvisit;
		if missing(_INFILE_) then delete;
	run;

* --- 1. GETDATA--- *;
filename supp "/cdm/prod/extfiles/Supp_Docs/OTHER_GLOBAL_SUPP/RSP_supp_doc.csv";



data g_rsp_supp;
format viewname $50. original_itemquestion $200. itemquestion $200. controllevel $10. columnname $200. prefix $10.;
infile supp missover pad DSD delimiter = ',' firstobs=2;
input viewname original_itemquestion itemquestion controllevel columnname prefix;
if missing(_INFILE_) then delete;
form_alias='RSP';
run;



data global_supp;
format   viewname $50. original_itemquestion $200. itemquestion $200. controllevel $10. columnname $200. prefix $10.;
set g_rsp_supp;
formname=substr(viewname,4,find(cats(viewname,'_'),'_',4)-4);
run;

%supp(global_supp);
	%obscnt(global_supp);
	%let gcnt_list = &nobs;

*---2 Getting data from SA,DOV and cv_datadictionary forms and items---*;

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
	               COALESCEC((select distinct cat(strip(columnname),' AS DELETEDITEM_a') from rd_datadictionary deleteditem where s.viewname = deleteditem.viewname and columnname = 'DELETEDITEM'),'NULL AS DELETEDITEM_a') as adeleteditem,s.original_itemquestion
	          from global_supp s inner join rd_datadictionary r
			    on s.viewname = r.viewname
			   and s.columnname = r.columnname 
			   and strip(s.original_itemquestion)=upper(strip(r.itemquestion))
			 order by s.viewname, s.itemquestion;

	    disconnect from dbtest;
	quit;

/*proc print data=dov;*/
/*run;*/
/*endsas*/


	%* --- 3 Programmer Action Needed: Assign form/item alias based on itemquestion and form based on report design ---*;
data study_supp_alias (keep= formname viewname columnname itemquestion item_alias form_alias mformidx mdeletedform aitemsetidx adeletedform adeleteditem);
		set studyfm;
		format item_alias $50. form_alias $50.;

		if COMPRESS(upcase(compbl(itemquestion)),,'d') in ('DATE RESPONSE DETERMINED') and controllevel = 1 
and upcase(prefix)='DT' then do;
	         item_alias = 'rsp_dt';
			 form_alias = 'rsp';
	    end;
		
	
      else if upcase(compbl(itemquestion)) in ('OVERALL RESPONSE') and upcase(prefix)='CD' and controllevel = '1' 
 then do; 
			item_alias = 'rsp_resp';
			 form_alias = 'rsp';
	    end;

		else if upcase(compbl(itemquestion)) in ('RESPONSE') and upcase(prefix)='CD' and controllevel = '1'
 then do;
        	item_alias = 'rsp_resp2';
			form_alias = 'rsp';
		end;
	    

		else if upcase(compbl(itemquestion)) in ('HEMATOLOGIC RESPONSE') and upcase(prefix)='CD' 
and controllevel = '1' then do; 
			item_alias = 'rsp_resp3';
			form_alias = 'rsp';
		end;
		else if upcase(compbl(itemquestion)) in ('OVERALL IRECIST RESPONSE') and upcase(prefix)='CD' and controllevel = '1'  then do; 
			item_alias = 'rsp_resp4';
			form_alias = 'rsp';
		end;
		else if upcase(compbl(itemquestion)) in ('OVERALL RECIST RESPONSE') and upcase(prefix)='CD' and controllevel = '1'  then do; 
			item_alias = 'rsp_resp5';
			form_alias = 'rsp';
		end;
		else if upcase(compbl(itemquestion)) in ('PET RESPONSE') and upcase(prefix)='CD' and controllevel = '1' then do; 
			item_alias = 'rsp_resp6';
			form_alias = 'rsp';
		end;
		else if upcase(compbl(itemquestion)) in ('OVERALL IRRECIST RESPONSE') and upcase(prefix)='CD' and controllevel = '1' 
 then do; 
			item_alias = 'rsp_resp7';
			form_alias = 'rsp';
		end;
		
		
		
		if not missing(item_alias);
	run;

	data study_supp_alias;
	set study_supp_alias;
	put item_alias form_alias itemquestion;
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
		varycom = strip(columnname);
		put varycom columnname;
		
	run;

	data dic_all (keep=form_alias formname  viewname columnlst mformidx mdeletedform aitemsetidx adeletedform adeleteditem);
		set dic_vary;
		by form_alias formname;
		format columnlst $4000. ;
		retain columnlst;
		if first.formname then do;
			columnlst='m.subjectid,m.visitid,m.visitorder,m.visitmnemonic,m.formid,m.formmnemonic';
		end;
		columnlst = catx(',',columnlst,cat(strip(varycom),' as ', strip(item_alias)));
		if last.formname then output;
put columnlst;
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

/*proc print data=dic_all;*/
/*run;*/



 %* --- 3.4 Get Study form data based on report design ---*;
 data RSP_;
		format subjectid best12. visitid best12. visitorder best12. 
visitmnemonic $4000. formid best12. formmnemonic $4000. formidx_m best12. itemsetidx_a best12. 
        	 rsp_dt datetime20.
RSP_RESP $400. RSP_RESP1 $400. RSP_RESP2 $400. RSP_RESP3 $400. RSP_RESP4 $400. RSP_RESP5 $400.
RSP_RESP6 $400. RSP_RESP7 $400. ;

		stop;
	run;

	%macro movetable(table);
		proc delete data=&table;
		run;
	%mend;

	
	%macro gdataset;
	%GLOBAL cddformdis;
	%if &dic_cnt>0 %then %do; 
		proc sql;
			connect to oracle as dbtest (user=PDAMREAD orapw="&orpass" path=&dbpth connection=global);

			%do i = 1 %to &ecrf_nbr;

					create table &&formalias&i.._&i as select * from connection to dbtest
						(select &&columnlst&i,m.formindex,formidx_m, ITEMSETIDX_a,DELETEDITEM_a,DELETEDFORM_m
		                   from ( select ma.*,&&mformidx&i, &&aitemsetidx&i, &&adeleteditem&i,&&mdeletedform&i  
from &protocol.&id2..&&viewadd&i ma) m left join &protocol&id2..cv_dovfm d
						     on m.subjectid = d.subjectid
						    and m.visitid = d.visitid
						  where d.dovserrorvcb_dovserrorvsc__1 is null
		                    and coalesce(DELETEDFORM_m, 'N') = 'N' 
							and coalesce(DELETEDITEM_a, 'N') = 'N'
						);
			%end;
			disconnect from dbtest;
		quit;
		

	data rsp_final1;
			set rsp_:;

		run;
		
			%do i = 1 %to &ecrf_nbr;
			proc delete data=&&formalias&i.._&i;
			run;
			%end;
    %end;
	%mend;
	%gdataset;
data rsp_final;
set rsp_final1;
array new {*} rsp_resp: ;
do i=1 to dim(new);
new_rsp_resp = new{i};
output;
end;
if new_rsp_resp ~= ''; 
run;





/* --- define program specific macro variables ---;*/

* --- Create ORPASS variables for connection to Oracle in PROD and UAT environments--- *;

/*------create PMS Form filter------*/
data tmp;
      length A $500;
      a="&fname";
	  b="&rform";
	  
      run;
proc transpose data=tmp out=tmp1;
        var a b ;
		
        run;
data tmp2;
length wd$ 500;
set tmp1;
crt=0;
do until(wd eq '');
crt+1;
wd=scan(col1,crt,',');
if wd ne '' then do;
         wd1=put(wd,500.);
          if wd1='' then do;
             wd2=STRIP("'" || STRIP(wd1) || "'");
    put wd2=;
          end;
          else do ;
         wd2=STRIP(STRIP(wd2)||"," || "'" ||STRIP(wd1) || "'");
              put wd2=;
          end;
      end;
          end;*-- do until ---*;
        run;
        data tmp3;
        set tmp2;
wd2=substr(wd2,2);
run;
data _null_;
set tmp3;
call symputx('mvar'||left(_n_),upcase(STRIP(wd2)));
run;
%put &mvar1 &mvar2;

/* --- define program specific macro variables ---;*/

%if (&fname)=PMS1 %then %do;
%let ir = PMS1;
%let r = &fname;
%end;

%else %if (&fname)=PMST %then %do;
%let ir = PMST;
%let r = &fname;
%end;

%else %do;
%let ir = ALL;
%end;

filename pwfile "/cdm/prod/test/Mek/&pwfil.";

data  _null_ ;
  infile pwfile obs=1 length=l;
  input @;
  input @1 line $varying1024.  l;
  call symput("orpass",substr(line,1,l));
run;

*---Getting data from PMS1 and PMS1A forms and items---*;
proc sql noprint;
connect to oracle as dbtest (user=PDAMREAD orapw="&orpass" path=&dbpth connection=global);        

create table chkname as select * from connection to dbtest
(
SELECT DISTINCT FORMMNEMONIC
FROM &PROTOCOL.&ID2..IRV_STUDYVERSION_FORMS
%IF %LENGTH(&FNAME) > 0 %THEN %DO;
WHERE REGEXP_REPLACE(UPPER(TRIM(FORMMNEMONIC)),'[^A-Z|0-9]','') IN (&MVAR1)
%END;
%ELSE %DO;
WHERE FORMMNEMONIC IN ('PMS1','PMST')
%END;
);

create table tname as select * from connection to dbtest
(
SELECT DISTINCT VIEWNAME FROM &protocol.&id2..CV_DATADICTIONARY
WHERE UPPER(TRIM(VIEWNAME)) IN ('CV_PMS1FM','CV_PMSTFM')

);
create table tname1 as select * from connection to dbtest
(
SELECT DISTINCT VIEWNAME FROM &protocol.&id2..CV_DATADICTIONARY
WHERE UPPER(TRIM(VIEWNAME)) IN ('CV_ORAJFM')
);

quit;

proc sql noprint;
select count(*) as cnt into:cnt from tname;
select count(*) as cnt1 into:cnt1 from tname1;


select FORMMNEMONIC into:vname from CHKNAME;
select viewname into:pname seperated by ' ' from  TNAME ; /* Added in Version 4*/
quit;

%if &cnt=0 %then %do;
  data _null_
  file print;
  title4;
   title5;
   		put #10 @ 5 &MVAR1 " Form is not available for selected trial";
    run;
    %end;

    %else %if &cnt>0 %then %do;


proc sql noprint;
connect to oracle as dbtest (user=PDAMREAD orapw="&orpass" path=&dbpth connection=global);        


create table pms1 as select * from connection to dbtest
(


%if %index(&pname,CV_PMS1FM) > 0 %then %do;



SELECT pms1.subjectid, pms1.VISITMNEMONIC, pms1.FORMMNEMONIC, DT_PMS1DSDTCIT as date_of_assessment,
  PMS1DSTERMSMDCRC_PMS1DSTER_1 as pms1Response
  FROM &protocol.&id2..CV_PMS1FM pms1,
       &protocol.&id2..cv_dovfm dov
 where pms1.subjectid=dov.subjectid(+)
   and pms1.visitid=dov.visitid(+)
   and dovserrorvcb_dovserrorvsc__1 is null
   and upper (PMS1DSTERMSMDCRC_PMS1DSTER_1) = 'CLINICAL PROGRESSION'
   and DT_PMS1DSDTCIT is not null
   
 %end;

%if %index(&pname,CV_PMSTFM) > 0 %then %do;

   UNION
   
   SELECT pmst.subjectid, pmst.VISITMNEMONIC, pmst.FORMMNEMONIC, DT_PMSTDSSTDTCIT as date_of_assessment,
   PMSTTERMSUBDCRC_PMSTDSATER_1 as pms1Response
    FROM &protocol.&id2..CV_PMSTFM pmst,
       &protocol.&id2..cv_dovfm dov
       where pmst.subjectid=dov.subjectid(+)
   and pmst.visitid=dov.visitid(+)
   and dovserrorvcb_dovserrorvsc__1 is null
   and upper (PMSTTERMSUBDCRC_PMSTDSATER_1) = 'CLINICAL PROGRESSION'
   and DT_PMSTDSSTDTCIT is not null

%end;
   
   
);


create table subject as select * from connection to dbtest
(
 select a.subjectid,a.siteid, b.sitecountry as country, b.sitemnemonic as sitenbr, 
 a.subjectnumberstr as subjnbr, b.sascorressnumit as screennbr
 from &protocol.&id2..irv_cur_subject a, &protocol&id2..cv_safm b
 where a.subjectid = b.subjectid
 order by a.subjectid
 );
 
quit;
%end;




%if &cnt1 >0 %then %do ;
proc sql noprint;
connect to oracle as dbtest (user=PDAMREAD orapw="&orpass" path=&dbpth connection=global);        

create table rsp_final select * from connection to dbtest
(

SELECT o.subjectid, o.VISITMNEMONIC, o.FORMMNEMONIC, DT_ORAJRSDTCIT as rsp_dt,
  ORAJRSORRESNLRC_ORAJRSORRE_1 as new_rsp_resp
,formidx_m ,COLUMNNAME 
  FROM &protocol.&id2..CV_ORAJFM O
       
 where 
    NVL(deletedform, 'N') <>'Y'
   
   

);
quit;

 %end;


data rsp;
set rsp_final: ;
%if %length (&mvar2) >0 %then %do ;
where formmnemonic in (&mvar2);
%end;
put formmnemonic;
run;




/*4. Define treatment phase*/
	   %supp(phase_csv);

	%let cnt_phase = &nobs;
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
/*		proc print data = subj_tp;*/
/*		run;*/
	%mend;
	%getphase(phase_csv);
%* --- 1.8 Define treatment phase for PMS, SM and AE--- *;
	%obscnt(Subj_tp);
	%let Subj_tp = &nobs;
   %if &Subj_tp=0 %then %do;
   data final_1;
   set dov(obs=0);
   run;
   data final_2;
   set dov(obs=0);
   run;
   data final_3;
   set dov(obs=0);
   run;
   data final_4;
   set dov(obs=0);
   run;
   %end;
   %else %do;
    proc sql;
		create table pms_tp as
		select p.*, t.tporder, t.tpdtstr, t.next_tpdtstr
		from pms1 p, subj_tp t
		where p.subjectid = t.subjectid
		and datepart(p.date_of_assessment ) >= datepart(t.tpdtstr)
		and datepart(p.date_of_assessment) < datepart(t.next_tpdtstr);

		create table rsp_tp as
		select s.*, t.tporder, t.tpdtstr, t.next_tpdtstr
		from rsp s, subj_tp t
		where s.subjectid = t.subjectid
		and datepart(s.RSP_DT) >= datepart(t.tpdtstr) 
		and datepart(s.RSP_DT) < datepart(t.next_tpdtstr);

		
	quit;


/*logic*/

%subdataset(subject);

data pms_supp ;
		set pms_tp;
        date_of_assessment = datepart(date_of_assessment);
		format date_of_assessment date9.;
	run;
/*proc print data = pms_supp;*/
/*run;*/
/*endsas;*/
	data rsp_supp ;
		set rsp_tp;
        RSP_DT = datepart(RSP_DT);
		format RSP_DT date9.;
	run;

data onc_resp;
set RSP_SUPP;
where upper (new_rsp_resp)in ('PROGRESSIVE DISEASE','ICPD','IRPROGRESSIVE DISEASE','YES')
and rsp_dt is not null; 
run; 


proc sql noprint;

create table final2 as
(SELECT pms1.subjectid, pms1.VISITMNEMONIC,pms1.formmnemonic as pmsform, pms1Response ,date_of_assessment, 
rsp_dt as dt_response,onc.formmnemonic as oncform,new_rsp_resp,formidx_m,'Date Response Determined' as dateitem
from PMS_SUPP pms1, onc_resp onc
where pms1.subjectid=onc.subjectid
and rsp_dt < date_of_assessment
);


Create table final3 as
(select distinct b.country,b.sitenbr,b.subjnbr,f.pmsform,f.VISITMNEMONIC,f.date_of_assessment as date_of_assessment,
f.oncform,formidx_m,dateitem,dt_response
from subject b, final2 f
WHERE b.subjectid =f.subjectid
); 
quit;


data final;
set final3;
format date_of_assessment dt_response date11.;
IF pmsform IN (&MVAR1);
run;
/*proc print data = final;*/
/*run;*/
/*endsas;*/

proc sort data=final noduprecs;
by country sitenbr subjnbr;
run;
%end;

*--- if there are no observations then output message ---;
%* --- 6. Generate output to Excel --- *;

libname  taghm   "/cdm/prod/test/tagsets/taghome";

ods path taghm.tmplmst(update) sashelp.tmplmst(read);

%include "/cdm/prod/test/tagsets/excltags.tpl";
			  
ods tagsets.ExcelXP
%if &putfil=NON %then &putfilnm;  
    options ( embedded_titles        =  'yes'
              embedded_footnotes     =  'yes'
              print_footer           =  'Page &amp;P of &amp;N'
              sheet_name             =  'ONC_PMS1_004_JR_STD'
              orientation            =  'landscape'
              absolute_column_width  =  '12,6,15,10,25,15,10,5,50,15');
			  
%obscnt(final);
%if &nobs=0 %then %do;
/*TITLE5;*/

title5 italic bold height=3 color=midnightblue justify=center "PMS form  : &ir";
   
ods tagsets.ExcelXP

%if &putfil=NON %then &putfilnm; 
    options ( embedded_titles        =  'yes'
              embedded_footnotes     =  'yes'
			  width_fudge=".7"
               width_points='12' 
               absolute_column_width="30" 
                wrap="no"
              print_footer           =  'Page &amp;P of &amp;N'
              autofit_height         =  'yes'
              sheet_name             =  'ONC_PMS1_004_JR_STD'
			  orientation            =  'landscape'
			 
              );

data FINALTAB1;
length nodata$ 150;
nodata='';
run;

options formchar='|_' missing=' ' pageno=1 nobyline ls=150;

proc report data=FINALTAB1 nowd noheader;
COMPUTE after;

line @50 "No records meet the test condition";

ENDCOMP;
RUN;
%let putfil=YES;
%end;

%else %do;

/*TITLE5;*/
title5 italic bold height=3 color=midnightblue justify=center "PMS form  : &ir";

	options formchar='|_' missing=' ' pageno=1 nobyline ls=150;

		proc report data=final headline headskip spacing=1 split='*' missing
		style(report)={just=center font_face=times   font_size=1 cellspacing=1 borderwidth=1 background=white}
		style(header)={vjust=top   font_face=verdana font_size=1 font_weight=bold cellheight = 5 background=#7c98B0 
					   foreground = white htmlstyle="text-align:center"}
		style(column)={just=center font_face=calibri background=white htmlstyle="text-align:center"};
        
         
         define country              /  display  width=12 flow  'Country'                         left     style(column)={just=l};
         define sitenbr              /  display  width=6        'Site'                            center   style(column)={tagattr='format:@'};
         define subjnbr              /  display  width=15       'Subject Number'                  center   style(column)={tagattr='format:@'};
         define pmsform              /  display  width=10       'PMS Form'                        center;  
         define VISITMNEMONIC        /  display  width=50       'PMS Visit'                       center   style(column)={just=c};
         define date_of_assessment   /  display  width=15       'PMS Date'                        center;
         define oncform              /  display  width=10       'eCRF'                            center;  
         define formidx_m             /  display  width=30 flow  'Seq#'                            center   style(column)={just=c};
         define dateitem             /  display  width=50       'Item Name'                       center;
         define dt_response          /  display  width=15       'Item Date'                       center;   
                
    run;			
%let putfil=YES;
%end;
%if &aform = Y %then
    	%do;
    		ods tagsets.excelxp  
    			options ( embedded_titles        =  'yes'
    			embedded_footnotes     =  'yes'
    			print_footer           =  'Page &amp;P of &amp;N'
    			sheet_name             =  'study_phase_supp'
    			orientation            =  'landscape'
    			absolute_column_width  =  '5,40,40');

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
    		title7	&titleformat "Supporting Doc Page: &aform";
            

    		proc report data=supp headline headskip spacing=1 split='*' missing
    			style(report)={just=center font_face=times   font_size=1 cellspacing=2 borderwidth=2 background=white}
    			style(header)={vjust=top   font_face=verdana font_size=2 font_weight=bold cellheight = 22 background=#7c98B0 
    			foreground = white htmlstyle="text-align:center"}
    			style(column)={just=center font_face=calibri background=white htmlstyle="text-align:center"};
    			column  order phase visit;
    			define order       	/ display   width=5 'Phase Order';
    			define phase      / display   width=40 'Treatment Phase' flow;
    			define visit	/ display 	width=40 'First Visitmnemonic of Treatment Phase' flow;
    		run;

    	%end;
    %let putfil=YES;
ods tagsets.excelxp close;
run;

*************end;

%deletall;

%end;
%mend;

