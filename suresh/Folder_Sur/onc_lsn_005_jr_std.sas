***********************************************************************;
* Description: This report will list when fragment number is selected  ; 
* but there are missing or duplicate fragment numbers for the same lesion.;
***********************************************************************;
*  Revision History:                                                   ;
*  Version 1 - Initial Version                                         ;
*  Version 2 - Programming update                                                ;
*  (columnname for item 'Indicate if Lesion Merged or Split' is considered dynamically) ;
*  Version 3 - [29-Jul-2021][Pavan Kumar K][Programming update] ;
*  Version 4 - [04-Mar-2022][Deepika Basavaraju][Note 2 updated adding LSN support doc] ;
*  Version 5 - [03-Oct-2022][Deepika Basavaraju][Note 4 added] ;
*  Version 6 - [17-Jan-2024][Deepika Basavaraju][Programming issue] ;
*  Version 7 - [07-Jun-2024][Deepika Basavaraju][Programming issue] ;
*  Version 8 - [28-Aug-2024][Deepika Basavaraju][Programming issue] ;
*  Version 9 - [24-Oct-2024][Deepika Basavaraju][Programming issue] ;
*  Version 10 - [09-Apr-2025][Divakar Purohit][Programming issue : Both missing and duplicate scenarios updated] ;
*  Version 11 - [01-Jul-2025][Divakar Purohit][Programming issue] ;
*  Version 12 - [29-Sep-2025][Divakar Purohit][Programming issue, One itemquestion was missing in FragmentNumber hardcoded values, which is included in this version ] ;
***********************************************************************;
/*MK3475-051 MK3475-667*/

%macro onc_lsn_005_jr_std;

%let checkid=%upcase(onc_lsn_005_jr_std);
%let vernum = 12;
%let reptitle=Fragment number entry missing or duplicate; 
%let repdesc=This report will list when fragment number is selected but there are missing or duplicate fragment numbers for the same lesion.;

%gdmsrptheader;
%orasetup;
option IBUFSIZE=max;

/*---create eCRF filter------*/
data tmp;
      length A $50 b $100 ;
      a="&crf";
          
          run;
        proc transpose data=tmp out=tmp1;
        var a;
        run;
data tmp2;
length wd$ 50;
set tmp1;
crt=0;
do until(wd eq '');
crt+1;
wd=scan(col1,crt,',');
if wd ne '' then do;
         wd1=put(upcase(compress(wd)),50.);
          if wd1='' then do;
             wd2=trim("'" || trim(wd1) || "'");
    put wd2=;
          end;
          else do ;
         wd2=trim(trim(wd2)||"," || "'" ||trim(wd1) || "'");
              put wd2=;
          end;
      end;
          end;*-- do until ---*;
        run;
        data tmp3;
        set tmp2;
wd2=substr(wd2,3);
run;
data _null_;
set tmp3;
call symputx('mvar'||left(_n_),upcase(strip(wd2)));
run;


/* --- define program specific macro variables ---;*/

%if %length(&mvar1)>0 %then %do;
%let fm=&crf;
%end;

%else %do;
%let fm=ALL;
%end;

%let just = center;
* --- 1. GETDATA--- *;
/*Supporting document added*/

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


      %* --- 3 Programmer Action Needed: Assign form/item alias based on itemquestion and form based on report design ---*;
      data study_supp_alias (keep=formname viewname columnname itemquestion item_alias form_alias mformidx mdeletedform aitemsetidx adeletedform adeleteditem  original_itemquestion /*V11: removed these 2 variables ASS_LN LES_NUM*/);
            set studyfm;
            format item_alias $50.;
            if  (upcase(compbl(itemquestion))) in ('FRAGMENT NUMBER') and prefix='CD' and controllevel = '1'
        and columnname in( 'HDAFRGMTNUMRC_HDAFRGMTNUM',
                           'LOELTUFRGMTNUMRC_LOELTUFRG_1',
                           'LSNEVFRGMTNUMRC_LSNEVFRGMT_1',
                           'LSNHMFRGMTNUMRC_LSNHMFRGMT_1',
                           'LSNIRTUFRGMTNUMRC_LSNIRTUF_1',
                           'LSNLGFRGMTNUMRC_LSNLGFRGMT_1',
                           'LSNLRTUFRGMTNUMRC_LSNLRTUF_1',
						   'LSNIRFRGMTNUMRC_LSNIRFRGMT_1',/*V12 : This itemquestion included to avoid issue*/
                           'LSNMMFRGMTNUMRC_LSNMMFRGMT_1',
                           'LSNPCFRGMTNUMRC_LSNPCFRGMT_1',
							'LSNCLTUFRGMTNUMRC_LSNCLTUF_1',
                           'LSNPIFRGMTNUMRC_LSNPIFRGMT_1',
                           'LSNRNTUFRGMTNUMRC_LSNRNTUF_1',
                           'LSRIRFRGMTNUMRC_LSRIRFRGMT_1','LSNEVTUFRGMTNUMRC_LSNEVTUF_1')
      then do;
               item_alias = 'FRAG_NUM';
                  form_alias = 'lsn';
          end;

            if  (upcase(compbl(itemquestion))) in ('FRAGMENT NUMBER') and prefix='C' and controllevel = '1' then do;
               item_alias = 'C_FRAG_NUM';
                  form_alias = 'lsn';
          end;



            if upcase(compbl(itemquestion)) in ('LESION NUMBER') and prefix='CD' and controllevel = '1' 
and columnname in( 'HDALSTULNKIDIT','LOELLSTULNKIDIT','LSNAJLSTULNKIDIT','LSNEILSSPIDIT','LSNHMLSTULNKIDIT',
'LSNIRLSLNKIDIT',
'LSNLRLSLNKIDIT','LSNMMLSTULNKIDIT','LSNPILSTULNKIDIT','LSNRNLSTULNKIDIT','LSNCLSTULNKIDIT',
'LSNBCLSTULNKIDIT',
'LSNEVLSTULNKIDIT',
'LSNLGLSTULNKIDIT',
'LSNPCLSTULNKIDIT',
'LSRIRLSTULNKIDIT','LSNWMTULNKIDIT'
)

then do; 
                  item_alias = 'LES_NUM';
                  form_alias = 'lsn';
          end;

            else if upcase(compbl(itemquestion)) in ('INDICATE IF LESION MERGED OR SPLIT') and prefix='CD' and controllevel = '1' then do;
            item_alias = 'MERGE_SPLIT';
                  form_alias = 'lsn';
            end;
          

            else if upcase(compbl(itemquestion)) in ('ASSOCIATED LESION NUMBER') and prefix='CD' and controllevel = '1' and columnname in( 'HDALSLNKGRPIT',
'LOELLSLNKGRPIT',
'LSNAJLSLNKGRPIT','LSNCLSLNKGRPIT','LSNRNLSLNKGRPNIT','LSNWMLSLNKGRPIT',
'LSNBCLSLNKGRPIT',
'LSNEVLSLNKGRPIT',
'LSNHMLSLNKGRPIT',
'LSNIRLSLNKGRPIT',
'LSNLGLSLNKGRPIT',
'LSNLRLSLNKGRPIT',
'LSNMMLSLNKGRPIT',
'LSNPCLSLNKGRPIT',
'LSNPILSLNKGRPIT',
'LSRIRLSLNKGRPIT',
'LSNEILSSPID2IT')
then do; 
                  item_alias = 'ASS_LN';
                  form_alias = 'lsn';
            end;
            else if upcase(compbl(itemquestion)) in ('SPONSOR ID NUMBER') and prefix='CD' and controllevel = '1'  then do; 
                  item_alias = 'ASS_SP';
                  form_alias = 'lsn';
            end;
            if not missing(item_alias);
      run;


      %* --- 4 Proceed item variation ---*;
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

      data dic_all (keep=form_alias formname  viewname varycom item_alias columnlst mformidx mdeletedform aitemsetidx adeletedform adeleteditem );
            set dic_vary;
            by form_alias formname;
            format columnlst $10000. ;
            retain columnlst;
            if first.formname then do;
            columnlst='m.subjectid,m.visitid,m.visitorder,m.visitmnemonic,m.formid,m.formmnemonic';
            end;
            columnlst = catx(',',columnlst,cat(strip(varycom),' as ', strip(item_alias)));
            if last.formname then output;
/*          put columnlst;*/
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

            if eof then call symput('ecrf_nbr',_n_);
      run;
      %obscnt(dic_all);
      %let dic_cnt = &nobs;

  
    %* --- 5 Get Study form data based on report design version 6 update---*;
/*      data lsn_0;*/
/*      */
/*     V11 : (removed this format step )     format subjectid best12. visitid best12. visitorder best12. visitmnemonic $4000. formid best12. formmnemonic $4000. formidx_m best12. itemsetidx_a best12. */
/*            FRAG_NUM $100. C_FRAG_NUM $100. LES_NUM $100.   MERGE_SPLIT $100. ASS_LN $100.  ASS_SP  best12. ;*/
/**/
/*            stop;*/
/*      run;*/


			
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
 %end;


 %do i = 1 %to &ecrf_nbr;

			proc contents data=&&formalias&i.._&i out=new  (keep=name type)  noprint;
			run;
			

			data _NULL_;
			set new;
			where name = 'LES_NUM'  ;
			call symputx('tp', type);
			run;
 
			data _NULL_;
			set new;
			where name = 'ASS_LN'  ;
			call symputx('tpp', type);
			run;

/*V11 data set name changed and provided '..' to avoid length issue*/
			data &&formalias&i.._&i;
			set &&formalias&i.._&i (rename= (LES_NUM=LES_NUM1 ASS_LN=ASS_LN1));
			%if &tp=1 %then %do;
			LES_NUM=put(LES_NUM1,10.);
            
			%end;
			%else %do;
			LES_NUM=LES_NUM1;
	
			%end;

            %if &tpp=1 %then %do;
			ASS_LN=PUT(ASS_LN1,10.);
            
			%end;
			%else %do;
			ASS_LN=ASS_LN1;
	
			%end;

		    drop LES_NUM1 ASS_LN1;

			run;     

%end;

data lsn;
set lsn_:;
run;



%do i = 0 %to &ecrf_nbr;
            %movetable(lsn_&i);
      %end;

      %mend;
      %gdataset;



      data lsn (keep = subjectid visitid visitmnemonic formmnemonic formidx_m itemsetidx_a 
FRAG_NUM C_FRAG_NUM LES_NUM  MERGE_SPLIT ASS_LN  ASS_SP );
            set lsn;

      run;

      proc sort data = lsn;
            by subjectid formmnemonic formidx_m;
      run;

      data lsn_min(keep= subjectid visitid visitmnemonic formmnemonic formidx_m itemsetidx_a FRAG_NUM C_FRAG_NUM LES_NUM  MERGE_SPLIT ASS_LN  ASS_SP );
            set lsn;
            by subjectid formmnemonic formidx_m;
            if first.formidx_m;
      run;

/*    proc print data=lsn_min;*/
/*    run;*/
/*    endsas;*/
      /*6. main logic */


/*%if %index(&allform,LSNHM)>0 %then %do;*/


data refnamee;

set lsn_min;
run;


%subdataset(subject);

data ls1;
set refnamee;
run;



/*run;*/
/*Logic 1.2: There is no Lesion in logic 1 with Fragment Number1 is selected*/

data ls;
set ls1;

WHERE 
   merge_split              like 'Split%'
  and LES_NUM           IS NOT NULL
/*  AND ASS_LN               IS NOT NULL*/
  AND FRAG_NUM              IS NOT NULL;
  run;



  /*Logic 2: Lesion Number <> Null and Indicate if Lesion Merged or Split = Split and Split (Provide Associated Lesion Number) <> Null 
  and Fragment Number <> Null.*/
  /*Logic 2.1: There are more than 1 record in logic 2 with the same Split (Provide Associated Lesion Number) 
  and Fragment Number.*/

proc sql;
create table lesion1 as
(select subjectid,formmnemonic,ASS_SP as seq,LES_NUM,merge_split, ASS_LN,C_FRAG_NUM,FRAG_NUM,
count(FRAG_NUM) as count_les from ls group by subjectid, formmnemonic, FRAG_NUM);
quit;



proc sql;
create table lesion2 as
(select subjectid,formmnemonic,ASS_SP as seq,LES_NUM,merge_split, ASS_LN,C_FRAG_NUM,FRAG_NUM,
max(C_FRAG_NUM) as max_les from ls group by subjectid, formmnemonic, FRAG_NUM);
quit;



proc sql;
create table lesion3 as
(select subjectid,formmnemonic,ASS_SP as seq,  LES_NUM,merge_split,ASS_LN,C_FRAG_NUM,FRAG_NUM,
count(seq) as count_FRAG_NUM from ls group by subjectid, formmnemonic, FRAG_NUM);
quit;

proc sort data=lesion1;
by subjectid;
run;

proc sort data=lesion2;
by subjectid;
run;

proc sort data=lesion3;
by subjectid;
run;



data lesion;
merge lesion1(in=a) lesion2(in=b) lesion3(in=c);
by subjectid;
if a and b and c;
run;

proc sort;
by  FRAG_NUM C_FRAG_NUM;
run;



proc sort data=lesion ;
by subjectid FRAG_NUM ;
/*put _all_;*/
run;

proc sql ;
create table lesionx as
(select count(FRAG_NUM) as cnt , *
from lesion
group by subjectid,FRAG_NUM
);


quit;

proc sort data=lesionx nodupkey;
by subjectid FRAG_NUM;
run;

data lesionx;
set lesionx;
by subjectid FRAG_NUM;
if first.subjectid then n=0;
n+1;


data lesionx;
set lesionx;
nn=input(scan(FRAG_NUM,-1),best12.);


data lesionx;
set lesionx;


run;
/*endsas;*/


proc sql;

create table resultt as
(

select * from
(
SELECT subjectid, formmnemonic,  seq, LES_NUM AS lesion, merge_split,count_les, ASS_LN,
    FRAG_NUM AS fragment, 'Fragment Number missing' AS errmsg,input(substr(LES_NUM,6,1),best12.) as s,
	sum(case when upcase(FRAG_NUM)  = upcase('Fragment Number 1') then 1 else 0 end)as chk
  FROM lesion 
  group by subjectid
  ) where chk=0 and s<2

UNION ALL corr

select * from
(

select (case when cnt ne maxx then 1
			when maxx=1 then 1
			when minn ne 1 then 1 else 0 end) as cse ,* from 
(
select count(input(scan(fragment,-1),best12.)) as cnt,max(input(scan(fragment,-1),best12.)) as maxx,
min(input(scan(fragment,-1),best12.)) as minn,*
from (
select  subjectid, formmnemonic, seq,FRAG_NUM as fragment,  count(LES_NUM) as cntas,
LES_NUM AS lesion,merge_split,count_les, ASS_LN, 
'Fragment Number missing' AS errmsg

from
lesionx
)group by subjectid
))
where cse=1

UNION ALL corr


select * from (

select subjectid, formmnemonic, seq, lesion , merge_split,count_les,  ASS_LN,
fragment,errmsg
   from (

SELECT subjectid, formmnemonic, seq,FRAG_NUM as fragment,  count(LES_NUM) as cntas,
LES_NUM AS lesion,merge_split,count_les, ASS_LN, 
'Fragment Number duplicate' AS errmsg
  FROM lesion 
group by subjectid,LES_NUM
  
  )where cntas>1  and count_les>1
	
)
);


/**/
/*data resultt;*/
/*set resultt;*/
/*put _all_;*/
/**/
/*run;*/

create table final as

( SELECT distinct sa.subjectid,
  country,
  sitenbr,
  subjnbr,
  formmnemonic ,
  seq ,
  lesion  ,
  cat('Split - ',ASS_LN) as indicate,
  fragment ,
  errmsg   
FROM subject sa inner join resultt r
on sa.subjectid=r.subjectid );

quit;

data final;
set final;
%if %length(&mvar1)>0 %then %do;
where upcase(compress(formmnemonic)) in (&mvar1);
%end;
run;

/*proc print data=final;*/
/*run;*/
proc sort data=final nodupkey;
by country sitenbr subjectid subjnbr formmnemonic seq  lesion indicate fragment errmsg;
run;

*--- if there are no observations then output message ---;
%* --- 6. Generate output to Excel --- *;

libname  taghm   "/cdm/prod/test/tagsets/taghome";

ods path taghm.tmplmst(update) sashelp.tmplmst(read);

%include "/cdm/prod/test/tagsets/excltags.tpl";

ods tagsets.ExcelXP

%if &putfil=NON %then &putfilnm; 
    options ( embedded_titles        =  'yes'
              embedded_footnotes     =  'yes'
                    wrap                              =    "no"
              print_footer           =  'Page &amp;P of &amp;N'
              autofit_height         =  'yes'
              sheet_name             =  'ONC_LSN_005_JR_STD'
                    orientation            =  'landscape'
                    absolute_column_width  =  '14,4,13,5,10,15,25,20,25'
              );

/*<---   Create Macro Variable that holds Countries for the Title;*/

%obscnt(FINAL);
%If &nobs=0 %then %do;
title5 italic bold height=3 color=midnightblue justify=center "Lesion evaluation form : &fm";

ods tagsets.ExcelXP

%if &putfil=NON %then &putfilnm; 
    options ( embedded_titles        =  'yes'
              embedded_footnotes     =  'yes'
                    width_fudge                 =    ".7"
              width_points                =    '12' 
              absolute_column_width =    "30" 
              wrap                              =    "no"
              print_footer           =  'Page &amp;P of &amp;N'
              autofit_height         =  'yes'
              sheet_name             =  'ONC_LSN_005_JR_STD'
                    orientation            =  'landscape'
                  
            );

data FINAL;
length nodata$ 150;
nodata='';
run;

options formchar='|_' missing=' ' pageno=1 nobyline ls=150;

proc report data=FINAL nowd noheader;
COMPUTE after;

line @50 "No records meet the test condition";

ENDCOMP;
RUN;
%let putfil=YES;
%end;

%else %do;
title5 italic bold height=3 color=midnightblue justify=center "Lesion evaluation form : &fm";

options formchar='|_' missing=' ' pageno=1 nobyline ls=150;

            proc report data=final headline headskip spacing=1 split='*' missing
            style(report)={just=center font_face=times   font_size=1 cellspacing=1 borderwidth=1 background=white}
            style(header)={vjust=top   font_face=verdana font_size=1 font_weight=bold cellheight = 5 background=#7c98B0 
                    foreground = white htmlstyle="text-align:center"}
            style(column)={just=center font_face=calibri background=white htmlstyle="text-align:center"};
   column country sitenbr subjnbr formmnemonic seq  lesion indicate fragment errmsg;
          define country                  / display width=14 flow 'Country' left flow;
          define sitenbr                  / display width=04            'Site Mnemonic'  center style(column)={tagattr='format:@'};
          define subjnbr                  / display width=13            'Subject Number' center style(column)={tagattr='format:@'};
          define formmnemonic       / display width=05 left 'Lesion evaluation form' ;
          define seq                      / display width=10            'Seq #' center style(column)={just=c};
          define lesion                   / display width=15 flow left 'Lesion Number'; 
          define indicate                 / display width=25 left 'Indicate if Lesion Merged or Split' ;
          define fragment                 / display width=20 left 'Fragment Number';
          define errmsg                   / display width=25 left 'Error message' ;
    run;                
%let putfil=YES;
%end;
ods tagsets.excelxp close;
run;
%deletall;
%mend;

