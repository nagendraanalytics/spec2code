/*************************************************************************************************;
%* Report Description:                                                                            ;
%* This report will list subjects who are missing a Lesion Evaluation for each lesion every       ;
%* specific interval of time following the randomization date/start date of the corresponding     ;
%* treatment phase                                                                                ;
%*************************************************************************************************;
%* Report Logic:                                                                                  ;
%*  gCriteria Form1 h. h Criteria Itemquestion1 h =  gCriteria Value1 h AND                             ;
%*  gCriteria Form2 h. h Criteria Itemquestion2 h =  gCriteria Value2 h AND                             ;
%*  gCriteria Form3 h. h Criteria Itemquestion3 h =  gCriteria Value3 h AND                             ;
%* Logic 1.                                                                                       ;
%* Logic 1.1 There is a 'PMS Form' record with Trial Segment Reference = 'Trial Segment Reference';
%*                                                                                                ;
%* AND                                                                                            ;
%* Logic 1.2 There is no LSN eCRF. hDATE OF LESION EVALUATION h for each LSN records that belong to ;
%* the corresponding treatment phase meet below criteria:                                         ;
%* Logic 1.3 LSN eCRF. hDATE OF LESION EVALUATION h  >= DOV. Date of Visit where 'PMS Form' is      ;
%* located ? 'Lower window of days'                                                               ;
%* AND                                                                                            ;
%* Logic 1.4 LSN eCRF. hDATE OF LESION EVALUATION h <= DOV. Date of Visit where 'PMS Form' is       ;
%* located + 'Upper window of days'                                                               ;
%* AND                                                                                            ;
%* Logic 1.5 LSN. hMethod of Assessment h = 'Method of Assessment' per supporting document for the  ;
%* corresponding 'Group for Method'                                                               ;
%* AND                                                                                            ;
%* (                                                                                              ;
%* Logic 1.6 There is not PMS1A record with Trial Segment Reference = 'PMS1A Trial Segment        ;
%* Reference' AND Date of Assessment <= DOV.Date of Visit where 'PMS Form' is located ? 'Lower    ;
%* window of days'                                                                                ;
%* AND                                                                                            ;
%* Logic 1.7 There is not OEDRA record with Date of Assessment <= DOV.Date of Visit where 'PMS    ;
%* Form' is located ? 'Lower window of days'                                                      ;
%* )                                                                                              ;
%* Logic 2                                                                                        ;
%* Logic 2.1 System date  > 'Expected Timeframe'                                                  ;
%* AND                                                                                            ;
%* Logic 2.2 There is not at least one LSN record in the add entry section meet the below         ;
%* criteria:                                                                                      ;
%* (                                                                                              ;
%* Logic 2.3 LSN eCRF. hDATE OF LESION EVALUATION h within the 'Expected Timeframe' for each LSN    ;
%* record corresponding to each treatment phase                                                   ;
%* AND                                                                                            ;
%* Logic 2.4 LSN eCRF. hMETHOD OF ASSESSMENT h = 'Method of Assessment' per supporting document     ;
%* according to the corresponding 'Group for Method'                                              ;
%* )                                                                                              ;
%* AND                                                                                            ;
%* (                                                                                              ;
%* Logic 2.5 LSN eCRF. hLESION NUMBER h is not present in other record on the LSN eCRF. hINDICATE IF ;
%* LESION MERGED OR SPLIT h                                                                        ;
%* OR                                                                                             ;
%* Logic 2.6 LSN eCRF. hLESION NUMBER h is present in other LSN eCRF. hINDICATE IF LESION MERGED OR  ;
%* SPLIT but 'Expected Timeframe' is before to LSN eCRF. hDATE OF LESION EVALUATION h               ;
%* AND                                                                                            ;
%* Logic 2.7 LSN eCRF. hINDICATE IF LESION MERGED OR SPLIT h is NULL                                ;
%* OR                                                                                             ;
%* Logic 2.8 LSN eCRF. hINDICATE IF LESION MERGED OR SPLIT h is NOT NULL AND missing "Date" is after;
%*  the LSN eCRF. gDATE OF INITIAL IDENTIFICATION h                                                 ;
%* )                                                                                              ;
%* AND                                                                                            ;
%* Logic 2.9 There is not at least one record on the 'Oncologic Treatment' form with ODBF. gSTART  ;
%* DATE OF REGIMEN h/  gSTART DATE OF MEDICATION h. <> NULL OR 'Expected Timeframe' is before the    ;
%* minimum ODBF. gSTART DATE OF REGIMEN h/  g START DATE OF MEDICATION hDate entered across all       ;
%* records present in the form                                                                    ;
%* AND                                                                                            ;
%* Logic 2.10 There is not at least one record on the 'Oncologic Radiation' form with ORAD2.Date  ;
%* <> NULL AND ORAD2.Reason <> Palliative OR 'Expected Timeframe' is before the minimum ORAD2.Date;
%*  entered across all records present in the form                                                ;
%* AND                                                                                            ;
%* Logic 2.11 There is not at least one record on the 'Oncologic Surgery' form with OSOF eCRF. h   ;
%*  gDATE OF SURGERY/ DATE OF SURGERY / DATE OF SURGERY <> NULL OR  'Expected Timeframe' is before ;
%* the minimum OSOF eCRF. h  gDATE OF SURGERY/ DATE OF SURGERY / DATE OF SURGERY entered across all ;
%* records present in the form                                                                    ;
%* AND                                                                                            ;
%* (                                                                                              ;
%* Logic 2.12 There is not a PMS1A record with Trial Segment Reference = 'PMS1A Trial Segment     ;
%* Reference' AND Date of Assessment <= 'Expected Timeframe'                                      ;
%* OR                                                                                             ;
%* Logic 2.13 There is not an OEDRA record with Date of Assessment <= 'Expected Timeframe'        ;
%* )                                                                                              ;
%* AND                                                                                            ;
%* (                                                                                              ;
%* Logic 2.14 The subsequent treatment phase 'Minimal start timepoint' (DOV.Date of Visit OR Date ;
%* of Assessment of SR) = NULL                                                                    ;
%* OR                                                                                             ;
%* Logic 2.15 'Expected Timeframe' < 'Minimal start timepoint' (DOV.Date of Visit OR Date of      ;
%* Assessment of SR) of subsequent treatment phase                                                ;
%* )                                                                                              ;
%* AND                                                                                            ;
%* Logic 2.16 There is NOT at least one RNT record with RNT.Date of Assessment <> NULL            ;
%* Notes:                                                                                         ;
%* 1-      'Lesion Evaluation Form', 'Lower window of days', 'Upper window of days', 'Trial       ;
%* Segment Reference', 'PMS1A Trial Segment Reference', 'Minimal start timepoint', 'Oncologic     ;
%* Treatment', 'Oncologic Radiation', 'Oncologic Surgery', 'Method of Asssessment' and 'Group for ;
%* Method'  are values from supporting document                                                   ;
%* 2-      Equivalent items questions across different LSN eCRFs are going to be retrieved from   ;
%* the  eLSN_supp_doc f global supporting document.                                                 ;
%* 3-      If 'Upper window of days' is entered as NA in supporting document, then report will    ;
%* ignore Logic 1.4                                                                               ;
%* 4-      'PMS Form' = PMS1/PMST                                                                 ;
%* 5-      For Logic 1.6 and Logic 1.7Logic 2.12 and Logic 2.13: PMS1A is used in older studies   ;
%* while OEDRA is used in newer studies, therefore 'PMS1A Trial Segment Reference' could be       ;
%* entered as NA in supporting document.                                                          ;
%* 6-      LSN eCRF. hDATE OF LESION EVALUATION h, LSN eCRF. gDATE OF INITIAL IDENTIFICATION h, LSN   ;
%* eCRF. hINDICATE IF LESION MERGED OR SPLIT h, LSN eCRF. g TUMOR IDENTIFICATION h, LSN eCRF. hLESION  ;
%* NUMBER h, LSN eCRF. hMETHOD OF ASSESSMENT h are going to be retrieved from the  eLSN_supp_doc f     ;
%* global supporting document column C                                                            ;
%* 7-      ODBF. gSTART DATE OF REGIMEN h/  gSTART DATE OF MEDICATION h. are going to be retrieved    ;
%* from the  eODBF_supp_doc f global supporting document column C                                   ;
%* 8-      ORAD2.Date = Start Date                                                                ;
%* 9-      ORAD2.Reason <> Palliative refers to the item 'Reason for Radiation' <> 'Palliative    ;
%* Treatment or Symptom Control' OR 'Palliative Treatment or Symptom Control of Metastatic        ;
%* Disease' for older studies and 'Treatment Category' <> 'Palliative' for newer studies.         ;
%* 10-     OSOF.  gDATE OF SURGERY h are going to be retrieved from the  eOSOF_supp_doc f global      ;
%* supporting document column C                                                                   ;
%* 11-     Report will work for randomized patients only                                          ;
%* 12-     Report will work when LSN ECRF has been initialized. If the form is empty, then, no    ;
%* output is produced.                                                                            ;
%* 13-     Erroneous visits and deleted records will not be considered for programming            ;
%* 14- For ORAD2.Start date or OSOF.Date and Time Performed or ODBF.Start Date of Regime/START    ;
%* DATE OF MEDICATION are entered as UNK, day UNK will use the last day of the month, month UNK   ;
%* will use the last month of the year.                                                           ;
%* 15-     If 'Oncologic Treatment' from supporting document is entered as NA, then the report    ;
%* will ignore Logic 2.9                                                                          ;
%* 16-     If 'Oncologic Radiation' from supporting document is entered as NA, then the report    ;
%* will ignore Logic 2.10                                                                         ;
%* 17-     If 'Oncologic Surgery' from supporting document is entered as NA, then the report will ;
%* ignore Logic 2.11                                                                              ;
%* 18-     If a date is displayed in the output the report will display it in format 'DDMMMYYYY'  ;
%* 19-     Logic 1 will check missing LSN eCRF. hDATE OF LESION EVALUATION h for each lesion record ;
%* 20-     For table 1 column 9/table 2 column 10 the report will display the expected timeframe  ;
%* in format 'DDMMMYYYY to DDMMMYYYY' e.g., '01JAN2020 to 15JAN2020'                              ;
%* 21-     For table 2 and column 6 the report will display the result of 'Start week' +          ;
%* N*Frequency. Where N starts at 0 and increments by 1 for each expected timeframe.              ;
%* 22-     LSN eCRF. hINDICATE IF LESION MERGED OR SPLIT his not available for older trials,        ;
%* therefore, the report will not consider this item when it is not present.                      ;
%* 23-     For Scenario 2 the 'stop week' can be entered as NA if per protocol imaging assessments;
%*  should be performed until disease progression, death, withdrawal, the end of the study etc and;
%*  does not truly mention a real 'stop week'. For these cases the report will consider 'stop     ;
%* week' as system date and will continue output missing lesion evaluations until PMS1A/OEDRA Date;
%*  of Assessment is less than 'Expected Timeframe' according to the Logic 2.12 and Logic 2.13.   ;
%* 24-     'Expected Timeframe' is always expected to be after LSN eCRF. gDATE OF INITIAL          ;
%* IDENTIFICATION h. There might be cases where a new lesion appears after cycle 1, therefore, do  ;
%* not output if any missing 'Expected Timeframe' in LSN eCRF. hDATE OF LESION EVALUATION h is      ;
%* before LSN eCRF. gDATE OF INITIAL IDENTIFICATION h.                                              ;
%* 25-     'Expected Timeframe' will be calculated using the items 'Minimal start timepoint',     ;
%* 'Start week', 'Stop week', 'Frequency', 'Lower window of days', 'Upper window of days'.        ;
%* Steps to calculate the 'Expected Timeframe':                                                   ;
%* A.      Calculate different timepoints by doing the following mathematical operation:          ;
%* Timepoint 1: Minimal start timepoint + Start week                                              ;
%* Timepoint 2: Minimal start timepoint + Start week + 1*Frequency                                ;
%* Timepoint 3: Minimal start timepoint + Start week + 2*Frequency                                ;
%* Timepoint N: Minimal start timepoint + Start week + (N-1)*Frequency                            ;
%* B.      Timepoints calculated on step A should be: Minimal start timepoint + Start week <=     ;
%* Timepoint N <= Minimal start timepoint + Stop week                                             ;
%* C.      Expected Timeframe = From Timepoint N - 'Lower window of days' to Timepoint N + 'Upper ;
%* window of days'                                                                                ;
%* Example:                                                                                       ;
%* A.      Minimal start timepoint = 01-Jan-2020                                                  ;
%* B.      Start week = 6                                                                         ;
%* C.      Stop week = 30                                                                         ;
%* D.      Frequency = 6                                                                          ;
%* E.      Lower window of days = 7                                                               ;
%* F.      Upper window of days = 7                                                               ;
%* Timepoint 1 = 01-Jan-2020 + 6 weeks = 12-Feb-2020                                              ;
%* Expected Timeframe 1 = From 05-Feb-2020 to 19-Feb-2020                                         ;
%* Timepoint 2 = 01-Jan-2020 + 6 weeks + 6 weeks = 25-Mar-2020                                    ;
%* Expected Timeframe 2 = From 18-Mar-2020 to 01-Apr-2020                                         ;
%* Timepoint 3 = 01-Jan-2020 + 6 weeks + 12 weeks = 06-May-2020                                   ;
%* Expected Timeframe 3 = From 29-Apr-2020 to 13-May-2020                                         ;
%* 26- For Logic 2.1, Logic 2.4 and Logic 2.13 use the maximum date of the range for calculation  ;
%* e.g., if the range is  gFrom 01-Jun-2020 to 10-Jun-2020 h use 10-Jun-2020. For  Logic 2.7, Logic ;
%* 2.8, Logic 2.9, Logic2.10, Logic 2.11 use the minimum date e.g., use 01-Jun-2020.              ;
%* 27 ? For Logic 2, if Expected Timeframe of treatment phase X overlaps with start date of       ;
%* treatment phase X+1 then no output should be produced for treatment phase X. For example: if   ;
%* phase 2 starts on 14Feb2018,  e45 week f check for phase 1 is on 10FEB2018 and acceptable        ;
%* timeframe is 03FEB2018~17FEB2018 (lower and upper window is 7 days) then no output is produced ;
%* for  e45 week f.                                                                                 ;
%* 28-     If supporting doc is not provided, display the message as "ONC_LSN_003_JR_STD          ;
%* Supporting Document Not Present for This Trial"                                                ;
%* Requires supporting document to be named ONC_LSN_003_supp_<MKxxxxxxx>.csv and will contain the ;
%* following columns and associated content:                                                      ;
%* 1.           Criteria Form1 - Form with criteria that report will use to distinguish groups of ;
%* patients (eg. SR eCRF); enter NA if your study has the same requirement for all patients       ;
%* 2.           Criteria Itemquestion1 - Item within 'Criteria Form1' that will allow to          ;
%* distinguish different groups of patients (eg. Cohort on SR eCRF); enter NA if your study has   ;
%* the same requirement for all patients                                                          ;
%* 3.           Criteria Value1 - Value for 'Criteria Itemquestion1'; when met the report will use;
%*  specified settings (including window of days) for this group (eg. cohort A in item 'Cohort' on;
%*  SR eCRF); enter NA if your study has the same requirement for all patients                    ;
%* 4.           Criteria Form2 - Form with criteria that report will use to distinguish groups of ;
%* patients (eg. SR eCRF); enter NA if your study has the same requirement for all patients       ;
%* 5.           Criteria Itemquestion2 - Item within 'Criteria Form2' that will allow to          ;
%* distinguish different groups of patients (eg. Cohort on SR eCRF); enter NA if your study has   ;
%* the same requirement for all patients                                                          ;
%* 6.           Criteria Value2 - Value for 'Criteria Itemquestion2'; when met the report will use;
%*  specified settings (including window of days) for this group (eg. cohort A in item 'Cohort' on;
%*  SR eCRF); enter NA if your study has the same requirement for all patients                    ;
%* 7.           Criteria Form3 - Form with criteria that report will use to distinguish groups of ;
%* patients (eg. SR eCRF); enter NA if your study has the same requirement for all patients       ;
%* 8.           Criteria Itemquestion3 - Item within 'Criteria Form3' that will allow to          ;
%* distinguish different groups of patients (eg. Cohort on SR eCRF); enter NA if your study has   ;
%* the same requirement for all patients                                                          ;
%* 9.           Criteria Value3 - Value for 'Criteria Itemquestion3'; when met the report will use;
%*  specified settings (including window of days) for this group (eg. cohort A in item 'Cohort' on;
%*  SR eCRF); enter NA if your study has the same requirement for all patients                    ;
%* 10.      Phase Order ? Required for Scenario 1,2. Enter the number corresponding to the order  ;
%* in which each treatment phase occurs e.g. if your study has Initial Treatment Phase and Second ;
%* Course Treatment Phase, then, Initial Treatment Phase should be 1 and Second Course Treatment  ;
%* Phase should be 2. This value should match with the 'Phase Order' column from global study     ;
%* phase supporting document.                                                                     ;
%* 11.     Minimal start timepoint ? DOV.Date of Visit OR Date of Assessment of SR, Required for  ;
%* Scenario 2. Enter  eDOV f if study wants to use the Minimal start timepoint as DOV of visit from ;
%* study_phase_supp or  eSR f if minimal start point for first treatment phase should be set as Date;
%*  of assessment from SR eCRF. Simply enter 'NA' for Scenario 1.                                 ;
%* 12.      Lesion Evaluation Form ? Required for Scenario 1,2. Enter                             ;
%* LSNHM/LSNEV/LSRIR/LSNPC/LSNPI/LSNRN/LSNIR/LSNBC/LOEL/LSNEI                                     ;
%* 13.      Trial Segment Reference ? Required for Scenario 1. Enter the trial segment reference  ;
%* value from PMS1/PMST according to each treatment phase. For Scenario 2, simply enter as 'NA'   ;
%* 14.      PMS1A Trial Segment Reference ? Required for Scenario 1,2. Enter the trial segment    ;
%* reference value from PMS1A according to each treatment phase. If your study does not use PMS1A ;
%* then simply enter as 'NA'                                                                      ;
%* 15. Group for Method ? Optional for Scenario 1,2. This column and Method of Assessment should  ;
%* be used together. Used to group the different Methods of Assessment allowed per protocol       ;
%* requirements. If the same Group is used across more than one method (e.g., CT Scan or MRI), the;
%*  report will not produce output if any of those methods are already entered in the eCRF, please;
%*  note that when using the same  gGroup for Method h the following parameters need to be the same ;
%* for such group:  gLower window of days h,  gUpper window of days h,  gFrequency h,  gStart week h,     ;
%*  gStop week h,  gOncologic Treatment h,  gOncologic Radiation h and  gOncologic Surgery h. If different;
%*  Groups are used across more than one method (e.g., CT Scan and MRI), the report will not      ;
%* produce output if both methods are already entered in the eCRF, meaning that, if one is entered;
%*  and the other is NOT entered, the report will show output for the missing one. If there is no ;
%* need to consider the Method of Assessment for the study, simply type in NA.                    ;
%* 16. Method of Assessment ? Optional for Scenario 1,2. Type in the Method of Assessment (e.g, CT;
%*  Scan) that needs to be checked during each lesion evaluation. If there is no need to consider ;
%* the Method of Assessment for the study, simple type in NA.                                     ;
%* 17.      Lower window of days ? Required for Scenario 1,2. For Scenario 1 enter the amount of  ;
%* days when the last lesion evaluation should occur before the discontinuation of each treatment ;
%* phase e.g., 'scan is required within 4 weeks prior to discontinuation' then enter 28. For      ;
%* Scenario 2 enter the amount of days corresponding to the window applicable for each imaging    ;
%* timepoint e.g., 'imaging scans will occur every 6 weeks +/- 7', then enter 7.                  ;
%* 18.      Upper window of days ? Optional for Scenario 1. For Scenario 1 enter the amount of    ;
%* days when the last lesion evaluation should occur post discontinuation of each treatment phase ;
%* e.g., 'scan is required within +/- 4 weeks from discontinuation' then enter 28, if your study  ;
%* does not use this window then simply enter as 'NA'. Required for Scenario 2, enter the amount  ;
%* of days corresponding to the window applicable for each imaging timepoint e.g., 'imaging scans ;
%* will occur every 3 weeks +/- 7', then enter 7.                                                 ;
%* 19.      Frequency ? Required for Scenario 2. Enter the number of weeks when each lesion should;
%*  be assessed from start week e.g., 'The imaging assessment should be performed at Week 6 (42  } ;
%* 7 days), Week 12 (84  } 7 days) and Week 18 (126  } 7 days) from the date of randomization', then;
%*  enter 6. If the frequency changes during the same treatment phase a new row is expected with a;
%*  new frequency e.g., 'Subsequent tumor imaging should be performed every 9 weeks (63 days  }7   ;
%* days) until week 45', then enter 9. The value should always be in weeks. For Scenario 1 simply ;
%* enter as 'NA'                                                                                  ;
%* 20.      Start week ? Required for Scenario 2. Enter the week when the first lesion evaluation ;
%* should occur from first visit applicable to each frequency e.g., 'The imaging assessment should;
%*  be performed at Week 6 (42  } 7 days), Week 12 (84  } 7 days) and Week 18 (126  } 7 days) from   ;
%* the date of randomization.', then enter 6. If the frequency changes during the same treatment  ;
%* phase then a new row is expected with a new start week e.g., 'Subsequent tumor imaging should  ;
%* be performed every 9 weeks (63 days  }7 days) until week 45' then enter 27 (last stop week + new;
%*  frequency 18+9 = 27) as the new start week. The value should always be in weeks. For Scenario ;
%* 1 simply enter as 'NA'.                                                                        ;
%* 21.      Stop week ? Optional for Scenario 2. Enter the stop week when the last lesion         ;
%* evaluation should occur applicable to each frequency e.g., 'The imaging assessment should be   ;
%* performed at Week 6 (42  } 7 days), Week 12 (84  } 7 days) and Week 18 (126  } 7 days) from the   ;
%* date of randomization.', then enter 18. If the frequency changes during the same treatment     ;
%* phase then a new row is expected with a new stop week e.g., 'Subsequent tumor imaging should be;
%*  performed every 9 weeks (63 days  }7 days) until week 45' then enter 45 as the new stop week.  ;
%* Do NOT overlap start and stop week between multiple rows. If there is no 'stop week' simply    ;
%* enter as 'NA' and the report will output missing lesion evaluations until PMS1A/OEDRA is       ;
%* completed e.g., 'The first on study imaging assessment should be performed at 12 weeks (84 days;
%*   }7 days) after the restart of treatment. Subsequent tumor imaging should be performed every 12;
%*  weeks (84 days  }7 days) or more frequently if clinically indicated' then enter 'NA' as the    ;
%* stop week. The value should always be in weeks. For Scenario 1 simply enter as 'NA'            ;
%* 22.     Oncologic Treatment ? Optional for Scenario 2, enter ODBF/ODBHF/ODBNF/ODBCF if as soon ;
%* as a new therapy starts in the ODBX form lesion evaluations are NO longer required. Enter 'NA' ;
%* when per protocol lesion evaluations can be performed beyond the start of a new anti-cancer    ;
%* therapy. For Scenario 1 simply enter as 'NA'                                                   ;
%* 23.     Oncologic Radiation ? Optional for Scenario 2, enter ORAD2 if as soon as a new therapy ;
%* starts in the ORAD2 form lesion evaluations are NO longer required. Enter 'NA' when per        ;
%* protocol lesion evaluations can be performed beyond the start of a new anti-cancer therapy. For;
%*  Scenario 1 simply enter as 'NA'                                                               ;
%* 24.     Oncologic Surgery ? Optional for Scenario 2, enter OSOF/OSOFL if as soon as a new      ;
%* therapy starts in the OSOFX form lesion evaluations are NO longer required. Enter 'NA' when per;
%*  protocol lesion evaluations can be performed beyond the start of a new anti-cancer therapy.   ;
%* For Scenario 1 simply enter as 'NA'                                                            ;
%* 25.     Scenario ? Required, enter 1,2. If one scenario is not applicable for your study then  ;
%* there is no need to provide a row in the supporting document for that scenario.                ;
%* Criteria Form1,Criteria Itemquestion1,Criteria Value1,Criteria Form2, Criteria Itemquestion2,  ;
%* Criteria Value2,Criteria Form3,Criteria Itemquestion3,Criteria Value3, Phase Order,Lesion      ;
%* Evaluation Form,Trial Segment Reference,Group for Method, Method of Assessment,PMS1A Trial     ;
%* Segment Reference,Lower window of days,Upper window of days,Frequency,Start week, Stop         ;
%* week,Oncologic Treatment,Oncologic Radiation,Oncologic Surgery,Scenario                        ;
%* Example for Scenario 1 when upper window of days is applicable:                                ;
%* SR,Cohort,Cohort A,NA,NA,NA,NA,NA,NA,1,DOV,LSRIR,End of Treatment,End of First Course          ;
%* Follow-up,NA,NA,28,28,NA,NA,NA,NA,NA,NA,1                                                      ;
%* Example for Scenario 1 when upper window of days is applicable and CT Scan or MRI can be used: ;
%* SR,Cohort,Cohort B,NA,NA,NA,NA,NA,NA,2,DOV,LSRIR,End of Crossover,End of Crossover             ;
%* Follow-up,1,CT Scan,28,28,NA,NA,NA,NA,NA,NA,1                                                  ;
%* SR,Cohort,Cohort B,NA,NA,NA,NA,NA,NA,2,DOV,LSRIR,End of Crossover,End of Crossover             ;
%* Follow-up,1,MRI,28,28,NA,NA,NA,NA,NA,NA,1                                                      ;
%* Example for Scenario 1 when upper window of days is not applicable and CT Scan and MRI should  ;
%* be used (both are required Methods per protocol):                                              ;
%* NA,NA,NA,NA,NA,NA,NA,NA,NA,1,DOV,LSRIR,End of Treatment,End of First Course Follow-up,1,CT     ;
%* Scan,28,NA,NA,NA,NA,NA,NA,NA,1                                                                 ;
%* NA,NA,NA,NA,NA,NA,NA,NA,NA,2,DOV,LSRIR,End of Crossover,End of Crossover                       ;
%* Follow-up,2,MRI,28,NA,NA,NA,NA,NA,NA,NA,1                                                      ;
%* Example for Scenario 2 when frequency changes during the same treatment phase and lesion       ;
%* evaluations are no longer required as soon as the subject starts a new anti cancer therapy.    ;
%* NA,NA,NA,NA,NA,NA,NA,NA,NA,1,DOV,LSRIR,NA,End of First Course                                  ;
%* Follow-up,NA,NA,7,7,6,6,18,ODBF,ORAD2,OSOF,2                                                   ;
%* NA,NA,NA,NA,NA,NA,NA,NA,NA,1,DOV,LSRIR,NA,End of First Course                                  ;
%* Follow-up,NA,NA,7,7,9,27,45,ODBF,ORAD2,OSOF,2                                                  ;
%* NA,NA,NA,NA,NA,NA,NA,NA,NA,1,DOV,LSRIR,NA,End of First Course                                  ;
%* Follow-up,NA,NA,7,7,12,57,NA,ODBF,ORAD2,OSOF,2                                                 ;
%* NA,NA,NA,NA,NA,NA,NA,NA,NA,2,DOV,LSRIR,NA,End of Crossover                                     ;
%* Follow-up,NA,NA,7,7,12,12,NA,ODBF,ORAD2,OSOF,2                                                 ;
%* Example for Scenario 2 when frequency changes during the same treatment phase and lesion       ;
%* evaluations can be performed after the subject has started a new anti cancer therapy.          ;
%* NA,NA,NA,NA,NA,NA,NA,NA,NA,1,DOV,LSRIR,NA,End of First Course                                  ;
%* Follow-up,NA,NA,7,7,6,6,18,NA,NA,NA,2                                                          ;
%* NA,NA,NA,NA,NA,NA,NA,NA,NA,1,DOV,LSRIR,NA,End of First Course                                  ;
%* Follow-up,NA,NA,7,7,9,27,45,NA,NA,NA,2                                                         ;
%* NA,NA,NA,NA,NA,NA,NA,NA,NA,1,DOV,LSRIR,NA,End of First Course                                  ;
%* Follow-up,NA,NA,7,7,12,57,NA,NA,NA,NA,2                                                        ;
%* NA,NA,NA,NA,NA,NA,NA,NA,NA,2,DOV,LSRIR,NA,End of Crossover                                     ;
%* Follow-up,NA,NA,7,7,12,12,NA,NA,NA,NA,2                                                        ;
%* Example for scenario 2 when there are two cohorts with different ranges (eg. Cohort A has scans;
%*  every 2 weeks and cohort B every 4 weeks, start point is SR, window for each scan is +/- 7    ;
%* days) and there is no need to consider the Method of Assessment                                ;
%* SR,Cohort,Cohort A,NA,NA,NA,NA,NA,NA,1,DOV,LSRIR,NA,End of First Course                        ;
%* Follow-up,NA,NA,7,7,2,2,NA,ODBF,ORAD2,OSOF,2                                                   ;
%* SR,Cohort,Cohort B,NA,NA,NA,NA,NA,NA,1,SR,LSRIR,NA,End of First Course                         ;
%* Follow-up,NA,NA,7,7,4,4,NA,ODBF,ORAD2,OSOF,2                                                   ;
%* Example  for scenario 2 when there are two cohorts with different ranges (eg. Cohort A has     ;
%* scans every 2 weeks and cohort B every 4 weeks, start point is SR, window for each scan is +/- ;
%* 7 days) and CT Scan is valid for Cohort A but MRI is valid for Cohort B                        ;
%* SR,Cohort,Cohort A,NA,NA,NA,NA,NA,NA,1,DOV,LSRIR,NA,End of First Course Follow-up,1,CT Scan,   ;
%* 7,7,2,2,NA,ODBF,ORAD2,OSOF,2                                                                   ;
%* SR,Cohort,Cohort B,NA,NA,NA,NA,NA,NA,1,SR,LSRIR,NA,End of First Course                         ;
%* Follow-up,1,MRI,7,7,4,4,NA,ODBF,ORAD2,OSOF,2                                                   ;
%* Example   for scenario 2 when there are two methods that are valid (e.g., CT Scan OR MRI could ;
%* be used)  for the same Cohort                                                                  ;
%* SR,Cohort,Cohort A,NA,NA,NA,NA,NA,NA,1,DOV,LSRIR,NA,End of First Course Follow-up,1,CT         ;
%* Scan,7,7,2,2,NA,ODBF,ORAD2,OSOF,2                                                              ;
%* SR,Cohort,Cohort A,NA,NA,NA,NA,NA,NA,1,SR,LSRIR,NA,End of First Course                         ;
%* Follow-up,1,MRI,7,7,2,2,NA,ODBF,ORAD2,OSOF,2                                                   ;
%* Example   for scenario 2 when there are two methods that are valid (CT Scan AND MRI should be  ;
%* used)  for the same Cohort                                                                     ;
%* SR,Cohort,Cohort A,NA,NA,NA,NA,NA,NA,1,DOV,LSRIR,NA,End of First Course Follow-up,1,CT         ;
%* Scan,7,7,2,2,NA,ODBF,ORAD2,OSOF,2                                                              ;
%* SR,Cohort,Cohort A,NA,NA,NA,NA,NA,NA,1,SR,LSRIR,NA,End of First Course                         ;
%* Follow-up,2,MRI,7,7,4,4,NA,ODBF,ORAD2,OSOF,2                                                   ;
%* 29-     The supporting document is required for all trials if treatment phase is applied to    ;
%* logic,even if only one treatment phase is present.                                             ;
%* This supporting document is only required to be created once per trial. If it was already      ;
%* created and uploaded, there is no need to duplicate it.                                        ;
%* The supporting document should be named as study_phase_supp_<MKxxxxxxx>.csv and will contain   ;
%* the following columns and associated content:                                                  ;
%* One row for each Treatment Phase                                                               ;
%* 1. Phase Order: required,the order on which phases will appear on protocol                     ;
%* 2. Treatment Phase: name of each study phase (Intial Treatment Phase, Neodjuvant Phase, Secon  ;
%* Course Phase)                                                                                  ;
%* 3. Minimal start timepoint: required,the first visit on which treatment is expected to be      ;
%* administered on each phase.                                                                    ;
%* e.g.                                                                                           ;
%* 1, Initial Treatment Phase, Cycle 1                                                            ;
%* 2, Second Course Phase, Cycle 1 Course 2                                                       ;
%* 3, Crossover Phase, Crossover Cycle 1                                                          ;
%* The actual information provided by the supporting doc can be outputted by selecting Y in the   ;
%* parameter "Study Phase Page".                                                                  ;
%* 30-     The report logic should be checked within the same treatment phase defined in the study;
%*  phase supporting document.                                                                    ;
%* For example, if user provides two Treatment Phases in supporting document like below:          ;
%* Phase Order, Treatment phase, Minimal start timepoint                                          ;
%* 1,Initial Treatment Phase,Cycle 1                                                              ;
%* 2,Second Course Phase,Second Course Cycle 1                                                    ;
%* The treatment phase will be identified as following for trials where LSN eCRF. hINDICATE IF     ;
%* LESION MERGED OR SPLIT h is present:                                                            ;
%* Initial Treatment Phase: LSN eCRF. gDATE OF INITIAL IDENTIFICATION h. with condition 1 <= Cycle 1;
%*  <= LSN eCRF. gDATE OF INITIAL IDENTIFICATION h. with condition 2 OR LSN eCRF. gDATE OF INITIAL   ;
%* IDENTIFICATION h. with condition 3 < Second Course Cycle 1                                      ;
%* Second Course Phase: LSN eCRF. gDATE OF INITIAL IDENTIFICATION h. with condition 1 <= Second     ;
%* Course Cycle 1 <= LSN eCRF. gDATE OF INITIAL IDENTIFICATION h. with condition                    ;
%* 2 OR LSN eCRF. gDATE OF INITIAL IDENTIFICATION h. with condition 3                               ;
%* The treatment phase will be identified as following for trials where Indicate if Lesion Merged ;
%* or Split is NOT present:                                                                       ;
%* Initial Treatment Phase: LSN eCRF. gDATE OF INITIAL IDENTIFICATION h. with condition 4 <= Cycle 1;
%*  <= LSN eCRF. gDATE OF INITIAL IDENTIFICATION h. with condition 3 < Second Course Cycle 1        ;
%* Second Course Phase: LSN eCRF. gDATE OF INITIAL IDENTIFICATION h. with condition 4 <= Second     ;
%* Course Cycle 1 <= LSN eCRF. gDATE OF INITIAL IDENTIFICATION h. with condition 3                  ;
%* Condition 1 = LSN eCRF. g TUMOR IDENTIFICATION h= 'non-target/target' and Indicate if Lesion     ;
%* Merged or Split = NULL                                                                         ;
%* Condition 2 = LSN eCRF. g TUMOR IDENTIFICATION h= 'non-target/target' and Indicate if Lesion     ;
%* Merged or Split <> NULL                                                                        ;
%* Condition 3 = LSN eCRF. g TUMOR IDENTIFICATION h= 'new'                                          ;
%* Condition 4 = LSN eCRF. g TUMOR IDENTIFICATION h=  'non-target/target'                           ;
%* 'non-target/target' = Non-Target, Target, Target Extra Nodal, Target Nodal, Non-Target Nodal,  ;
%* Non-Target Extra Nodal, Non-Target Enhancing, Non-Target Non-Enhancing, Bone Lesion            ;
%* 'new' = New, New Lesion Since Last Evaluation, New Non-Target Extra Nodal, New Non-Target      ;
%* Nodal, New Target Nodal, New Target Extra Nodal, New Bone Lesion                               ;
%* 31. Report will display Criteria Value as specified in supp document in the corresponding      ;
%* columns Criteria Value1, Criteria Value2 and Criteria Value3. These Criteria Value is the value;
%*  from eCRF specified in Column  eCriteria Form1/2/3 f and in Item specified in column  eCriteria  ;
%* Itemquestion1/2/3 f.                                                                            ;
%* 32. Report will use different settings for different Criteria Values specified in supporting   ;
%* document                                                                                       ;
%* 33.  For table 2 and column 12 the report will display the form that have min date for Logic   ;
%* 2.9~2.13.                                                                                      ;
%* 34. For table 2 and column 13 the report will display the seq that have min date for Logic     ;
%* 2.9~2.13.                                                                                      ;
%* 35. For table 2 and column 14 the report will display the min date for Logic 2.9~2.13 in format;
%*  'YYYY/MM/DD' e.g., '2020/09/UNK'.                                                             ;
%* 36. Report check PMS1A record within the same phase order if multiple PMS1A/OEDRA Trial Segment;
%*  Reference values are provided for one phase order                                             ;
%* 37. For Table 2 and Column 15, display the date from OEDRA.Date of Assessment in format        ;
%* 'DDMMMYYYY'. If not available, then display blank                                              ;
%* 38. For Table 2 and Column 16, display the date from PMS1A.Date of Assessment in format        ;
%* 'DDMMMYYYY'. If not available, then display blank                                              ;
%* 39. If Group for Method and Method of Assessment are entered as NA in the supporting document, ;
%* the report will ignore Logic 1.5 and 2.4                                                       ;
%* 40. The  gOther h free textbox in the  gMethod of Assessment h field will not be considered for    ;
%* programming                                                                                    ;
%* 41. RNT is not used in old trials, only new trials have implemented RNT, therefore, Logic 2.16 ;
%* is not applicable for old trials                                                               ;
%* 42. The form listed in  eCut-off Exclude Form f parameter will not be taken into consideration in;
%*  cut-off calculation in Logic 1 and Logic2. For example, if  ePMS1A f is entered for  eCut-off    ;
%* Exclude Form f parameter, logic 1.6 and logic 2.12 will be ignored                              ;
%*************************************************************************************************;
%* Program Flow:                                                                                  ;
%* 1. Check the existance of supporting doc for ONC_LSN_003_JR_STD                                ;
%* 2. Get information from supporting doc                                                         ;
%* 3. Manage itemquestion according to spec and forms based on study                              ;
%* 4. Process LSN dataset considering merge split                                                 ;
%* 5. Get treatment phase by subject                                                              ;
%* 6. Get pms1_tp/pms1a_tp/lsn_tp with treatment phase info                                       ;
%* 7. Proceed Criteria                                                                            ;
%* 8. Final Dataset with subdataset filter                                                        ;
%* 9. Generate output to Excel                                                                    ;
%*************************************************************************************************;
%* Macros Used:                                                                                   ;
%* gdmsrpt_macros                                                                                 ;
%*************************************************************************************************;
%* Revision History:                                                                              ;
%* Version 1 - Initial Version                                                                    ;
%* Version 2 - Code updated to improve performance issue [09Feb 2021] Cindy Bao                   ;
%* Version 3 - Supporting document structure is updated to add criteria information. It allows    ;
%*             using different window of days for subset of patients specified in supp document   ;
%*             (eg. different cohorts) and different start point (DOV or SR date); LOEL eCRF      ;
%*             included in the logic                                                              ;
%*             [02Jun 2021] Cindy Bao                                                             ;
%* Version 4 - Logic updated to include LSN, ODBF and OSOF master supporting document             ;
%*             [11Aug 2021] Cindy Bao                                                             ;
%* Version 5 - Logic Note 14: clarification updated for day/month 'UNK', Column display: add Min  ;
%*             cut off form/Min cut off seq/Min cut off date for logic 2.7~2.11                   ;
%*             [24Nov 2021] Cindy Bao                                                             ;
%* Version 6 - Add Logic Note 36:Report check PMS1A record within the same phase order if multiple; 
%*                          PMS1A Trial Segment Reference values are provided for one phase order ;
%*             [17Feb 2022] Cindy Bao                                                             ;
%* Version 7 - Code Update to avoid missing output when criteria value contain extra spaces       ; 
%*             [24Feb 2023] Cindy Bao                                                             ;
%* Version 8 - Logic Section: Reference text regarding criteria added prior to                    ;
%* Logic 1. Logic 1.7 added and Logic 2 re-written to include variables regarding Method of       ;
%* Assessment and Group for Method, Logic 2.16 is added. In Notes section references to Method of ;
%* Assessment and Group for Method were added and logic numbers updated accordingly. In supporting;
%*  document Criteria Form, Criteria Item and Criteria Value headers updated to Criteria Form1,   ;
%* Criteria Itemquestion1 and Criteria Value1. In supporting document Criteria Form2, Criteria    ;
%* Itemquestion2, Criteria Value2, Criteria Form3, Criteria Itemquestion3, Criteria Value 3, Group;
%*  for Method and Method of Assessment added as new headers (columns 4 to 9 and Columns 15-16)   ;
%* and corresponding examples are updated. In supporting document previous columns were           ;
%* renumbered. Notes 37, 38, 39, 40 and 41 added. Column Headings and Form.Items sections: For    ;
%* Table 2 columns 15 and 16 were added. Scenarios updated. Columns Criteria Value1/2/3 added.    ;
%* Parameter  eCut-off Exclude Form f is added in Parameter Selection section and corresponding Note;
%*  42 is added to clarify how the parameter impact report logic.  [23Mar 2023] Cindy Bao         ;
%* Version 9 - Code update to avoid report fail when parameter of 'Cut-off Exclude Form' select   ;
%*             OEDRA [12Jul 2023] Cindy Bao                                                       ; 
%*************************************************************************************************;
*/

%macro onc_lsn_003_jr_std;

%let checkid = %upcase(onc_lsn_003_jr_std);
%let vernum = 9;
%let reptitle=Missing Lesion Evaluation ; 
%let repdesc=This report will list subjects who are missing a Lesion Evaluation for each lesion every specific interval;

%gdmsrptheader;
%orasetup;

footnote3 &footformat "of time following the randomization date/start date of the corresponding treament phase.";

%macro movetable(table);
    proc delete data=&table;
    run;
%mend;

%macro supp1(suppset); /*to avoid replacement of '=' in criteria value  */

	%local rc dsid;
	%let dsid = %sysfunc(open(&suppset));

	data temp1;
		set &suppset;
	run;

	proc transpose data = temp1 out = middle;
		var _all_;
	quit;

	proc transpose data = middle out = temp1 (drop=_name_);
		id _name_;
		var col:;
	quit;

	data temp1;
		set temp1;
		array all_char[*] _character_;
		do i=1 to dim(all_char);
			/*if find(all_char[i],'<>') > 0 then all_char[i]=tranwrd(all_char[i],'<>','NE'); 
			if find(all_char[i],'=') > 0 then all_char[i]=tranwrd(all_char[i],'=','EQ');  */
			all_char[i]=tranwrd(upcase(strip(all_char[i])),'0D'x,''); /* convert all numeric variables to character */
		end;
		drop i;
	run;

	%let rc = %sysfunc(close(&dsid.));

	data &suppset;
		set temp1;
	run;

%mend supp1;

%* --- 1. Check the existance of supporting doc for ONC_LSN_003_JR_STD --- *;

%if %sysfunc(fileexist(/cdm/prod/extfiles/Supp_Docs/ONC_LSN_003_JR_STD/ONC_LSN_003_supp_&prot..csv)) = 0 %then %do;
	title6	&titleformat "Lesion Evaluation Form: &lsnformdis";
	title7	&titleformat "Cut-off Exclude Form: &cutoff_excludeids";
	title8	&titleformat "# of rows for Supporting Doc: &cnt_list";
	title9	&titleformat "Supporting Doc Page: &supppage";
	title10	&titleformat "Study Medication Page: &sppage";

	data _null_;
		file print;
		put #10 @10 "ONC_LSN_003_JR_STD Supporting Document Not Present for This Trial";
		put #12 @10 "Please check the DRP for Details and Contact your RaM Programmer for Assistance";
	run;
	
%end;
%else %if %sysfunc(fileexist(/cdm/prod/extfiles/Supp_Docs/STUDY_PHASE_SUPP/study_phase_supp_&prot..csv)) = 0 %then %do;
	title6	&titleformat "Lesion Evaluation Form: &lsnformdis";
	title7	&titleformat "Cut-off Exclude Form: &cutoff_excludeids";
	title8	&titleformat "# of rows for Supporting Doc: &cnt_list";
	title9	&titleformat "Supporting Doc Page: &supppage";
	title10	&titleformat "Study Medication Page: &sppage";

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
	filename supp "/cdm/prod/extfiles/Supp_Docs/ONC_LSN_003_JR_STD/ONC_LSN_003_supp_&prot..csv";
	data _null_;
	   infile supp;
	   input;
	   call symputx('num_cols',countc(_infile_,',')+1,'G');
	   stop;
	run;
	%put &num_cols;

	%if &num_cols=13 %then %do;
		data onc_lsn_csv;
			format tporder $10. lsn_frm $25. pms1_seg $200. pmsa_seg $200. 
	               low_day $20. upper_day $20. freq $20. str_wk $20. stp_wk $20.
	               treat_frm $25. orad_frm $25. surg_frm $25. scenario $20.;
			infile supp missover pad DSD delimiter = ',' firstobs=2;
			input tporder lsn_frm pms1_seg pmsa_seg low_day upper_day freq str_wk stp_wk treat_frm orad_frm surg_frm scenario;
			if missing(_INFILE_) then delete;
		run;
		data onc_lsn_csv;
		    set onc_lsn_csv;
			format criteria_form1 $25. criteria_item1 $500. criteria_val1 $500. 
                   criteria_form2 $25. criteria_item2 $500. criteria_val2 $500.
				   criteria_form3 $25. criteria_item3 $500. criteria_val3 $500.
                   startflag $10. method_group $10. method_ass $500.;
			criteria_form1='NA';
			criteria_item1='NA';
			criteria_val1='NA';
			criteria_form2='NA';
			criteria_item2='NA';
			criteria_val2='NA';
			criteria_form3='NA';
			criteria_item3='NA';
			criteria_val3='NA';
			startflag='DOV';
			method_group='NA';
			method_ass='NA';
		run;
		%supp1(onc_lsn_csv);
		%obscnt(onc_lsn_csv);
		%let cnt_list = &nobs;
	%end;
	%else %if &num_cols=17 %then %do;
		data onc_lsn_csv;
			format criteria_form1 $25. criteria_item1 $500. criteria_val1 $500. tporder $10. startflag $10. lsn_frm $25. pms1_seg $200. pmsa_seg $200. 
	               low_day $20. upper_day $20. freq $20. str_wk $20. stp_wk $20.
	               treat_frm $25. orad_frm $25. surg_frm $25. scenario $20.;
			infile supp missover pad DSD delimiter = ',' firstobs=2;
			input criteria_form1 criteria_item1 criteria_val1 tporder startflag lsn_frm pms1_seg pmsa_seg low_day upper_day freq str_wk stp_wk treat_frm orad_frm surg_frm scenario;
			if missing(_INFILE_) then delete;
		run;
		data onc_lsn_csv;
		    set onc_lsn_csv;
			format criteria_form2 $25. criteria_item2 $500. criteria_val2 $500.
				   criteria_form3 $25. criteria_item3 $500. criteria_val3 $500.
                   method_group $10. method_ass $500.;
			criteria_form2='NA';
			criteria_item2='NA';
			criteria_val2='NA';
			criteria_form3='NA';
			criteria_item3='NA';
			criteria_val3='NA';
			method_group='NA';
			method_ass='NA';
		run;
		%supp1(onc_lsn_csv);
		%obscnt(onc_lsn_csv);
		%let cnt_list = &nobs;		
	%end;
	%else %if &num_cols=25 %then %do;
		data onc_lsn_csv;
			format criteria_form1 $25. criteria_item1 $500. criteria_val1 $500. 
			       criteria_form2 $25. criteria_item2 $500. criteria_val2 $500.
			       criteria_form3 $25. criteria_item3 $500. criteria_val3 $500.
                   tporder $10. startflag $10. lsn_frm $25. pms1_seg $200. pmsa_seg $200. 
                   method_group $10. method_ass $500.
	               low_day $20. upper_day $20. freq $20. str_wk $20. stp_wk $20.
	               treat_frm $25. orad_frm $25. surg_frm $25. scenario $20.;
			infile supp missover pad DSD delimiter = ',' firstobs=2;
			input criteria_form1 criteria_item1 criteria_val1 criteria_form2 criteria_item2 criteria_val2 criteria_form3 criteria_item3 criteria_val3 tporder startflag lsn_frm pms1_seg pmsa_seg method_group method_ass low_day upper_day freq str_wk stp_wk treat_frm orad_frm surg_frm scenario;
			if missing(_INFILE_) then delete;
		run;
		%supp1(onc_lsn_csv);
		%obscnt(onc_lsn_csv);
		%let cnt_list = &nobs;		
	%end;
	%else %do;
	    title6	&titleformat "Lesion Evaluation Form: &lsnformdis";
		title7	&titleformat "Cut-off Exclude Form: &cutoff_excludeids";
		title8	&titleformat "# of rows for Supporting Doc: &cnt_list";
		title9	&titleformat "Supporting Doc Page: &supppage";
		title10	&titleformat "Study Medication Page: &sppage";

		data _null_;
			file print;
			put #10 @10 "ONC_LSN_003_JR_STD Supporting Document has Missing or Extra Columns for This Trial";
			put #12 @10 "Please check the DRP for Details and Contact your RaM Programmer for Assistance";
		run;		
	%end;

	%* --- 2.1.2 Global supporting document --- *;
	filename supp "/cdm/prod/extfiles/Supp_Docs/OTHER_GLOBAL_SUPP/LSN_supp_doc.csv";
	data g_lsn_supp;
		format viewname $50. original_itemquestion $200. itemquestion $200. controllevel $10. columnname $200. prefix $10. form_alias $10.;
		infile supp missover pad DSD delimiter = ',' firstobs=2;
		input viewname original_itemquestion  itemquestion controllevel columnname prefix;
		if missing(_INFILE_) then delete;
		form_alias='LSN';
	run;

	filename supp "/cdm/prod/extfiles/Supp_Docs/OTHER_GLOBAL_SUPP/ODBF_supp_doc.csv";
	data g_odbf_supp;
		format viewname $50. original_itemquestion $200. itemquestion $200. controllevel $10. columnname $200. prefix $10. form_alias $10.;
		infile supp missover pad DSD delimiter = ',' firstobs=2;
		input viewname original_itemquestion  itemquestion controllevel columnname prefix;
		if missing(_INFILE_) then delete;
		form_alias='ODBF';
	run;

 	filename supp "/cdm/prod/extfiles/Supp_Docs/OTHER_GLOBAL_SUPP/OSOF_supp_doc.csv";
	data g_osof_supp;
		format viewname $50. original_itemquestion $200. itemquestion $200. controllevel $10. columnname $200. prefix $10. form_alias $10.;
		infile supp missover pad DSD delimiter = ',' firstobs=2;
		input viewname original_itemquestion  itemquestion controllevel columnname prefix;
		if missing(_INFILE_) then delete;
		form_alias='OSOF';
	run;

	data global_supp;
		format formname $50. viewname $50. original_itemquestion $200. itemquestion $200. controllevel $10. columnname $200. prefix $10. form_alias $10.;
		set g_lsn_supp g_odbf_supp g_osof_supp;
		formname=substr(viewname,4,find(cats(viewname,'_'),'_',4)-4);
	run;

	%supp(global_supp);
	%obscnt(global_supp);
	%let gcnt_list = &nobs;

	%* --- 2.1.3 Study Phase supporting document --- *;
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
			  and instr(a.subjectnumberstr,'--')>0
	        order by a.subjectid
	       );

	    create table dov as select * from connection to dbtest
		    (
		     select subjectid, visitid, visitmnemonic, dt_dov, dovserrorvcb_dovserrorvsc__1 as err_visit 
			 	from &protocol&id2..cv_dovfm
			  where 1 = 1 order by subjectid, visitid
		    );

		insert into global_supp
		  values('SRFM','CV_SRFM','DATE OF ASSESSMENT','DATE OF ASSESSMENT','1','DT_SRDSDTCAASMTROIT','DT','SR')
		  values('SRFM','CV_SRFM','DATE OF ASSESSMENT','DATE OF ASSESSMENT','1','DT_SRDTCTMDIFFDT_SRDTCSAMIT','DT','SR')
		  values('SRFM','CV_SRFM','DATE OF ASSESSMENT','DATE OF ASSESSMENT','1','DT_SRDTCSADIFFDT_SRDTCSADIFFIT','DT','SR')
		  values('SRFM','CV_SRFM','DATE OF ASSESSMENT','DATE OF ASSESSMENT','1','DT_SRDTCTMDIFFDT_SRDTCTMDIFFIT','DT','SR')
		  values('SRIVRSFM','CV_SRIVRSFM','DATE OF ASSESSMENT','DATE OF ASSESSMENT','1','DT_SRDSDTCAASMTROIT','DT','SR')

          values('PMSTFM','CV_PMSTFM','DATE OF ASSESSMENT','DATE OF ASSESSMENT','1','DT_PMSTDSSTDTCIT','DT','PMS1')
		  values('PMSTFM','CV_PMSTFM','TRIAL SEGMENT REFERENCE','TRIAL SEGMENT REFERENCE','1','PMSTDSREFIDIT','CD','PMS1')
		  values('PMS1FM','CV_PMS1FM','DATE OF ASSESSMENT','DATE OF ASSESSMENT','1','DT_PMS1DSDTCIT','DT','PMS1')
		  values('PMS1FM','CV_PMS1FM','TRIAL SEGMENT REFERENCE','TRIAL SEGMENT REFERENCE','1','PMS1DSREFIDIT','CD','PMS1')

		  values('PMS1AFM','CV_PMS1AFM','DATE OF ASSESSMENT','DATE OF ASSESSMENT','1','DT_PMS1ADSDTCIT','DT','PMS1A')
		  values('PMS1AFM','CV_PMS1AFM','TRIAL SEGMENT REFERENCE','TRIAL SEGMENT REFERENCE','1','PMS1ADSREFIDIT','CD','PMS1A')
		  values('OEDRAFM','CV_OEDRAFM','DATE OF ASSESSMENT','DATE OF ASSESSMENT','1','DT_OEDRADSDTCIT','DT','PMS1A')
		  values('OEDRAFM','CV_OEDRAFM','TRIAL SEGMENT REFERENCE','TRIAL SEGMENT REFERENCE','1','OEDRADSREFIDRC_OEDRADSREFIDIT','CD','PMS1A')

		  values('ORAD2FM','CV_ORAD2FM','START DATE','START DATE','1','DT_ORAD2PRSTDTCIT','DT','ORAD2')
		  values('ORAD2FM','CV_ORAD2FM','START DATE','START DATE','1','DTS_ORAD2PRSTDTCIT','DTS','ORAD2')
		  values('ORAD2FM','CV_ORAD2FM','REASON FOR RADIATION','REASON FOR RADIATION','1','ORAD2PRLNTHPYIT','CD','ORAD2')
		  values('ORAD2FM','CV_ORAD2FM','REASON FOR RADIATION','REASON FOR RADIATION','1','ORAD2PRINDCIT','CD','ORAD2')
		  values('ORAD2FM','CV_ORAD2FM','REASON FOR RADIATION','TREATMENT CATEGORY','1','ORAD2CMTRTMNTCIT','CD','ORAD2')
		  values('RNTFM','CV_RNTFM','DATE OF ASSESSMENT','DATE OF ASSESSMENT','1','DT_RNTDSSTDTIT','DT','RNT')
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
		format item_alias $50.;
 		if upcase(compbl(itemquestion)) in ('DATE OF ASSESSMENT') and prefix='DT' and controllevel = '1' then do;
	         item_alias = 'dt_ass';
	    end;
		else if upcase(compbl(itemquestion)) in ('TRIAL SEGMENT REFERENCE') and prefix='CD' and controllevel = '1' then do;
			item_alias = 'trial_seg';
		end;
		else if upcase(strip(form_alias))='LSN' and upcase(compbl(itemquestion)) in ('METHOD OF ASSESSMENT') and prefix='CD' and controllevel = '1' then do; 
			item_alias = 'meth_ass_1';
		end;
		else if upcase(strip(form_alias))='LSN' and upcase(compbl(itemquestion)) in ('METHOD OF ASSESSMENT') and prefix='CD' and controllevel = '2' then do; 
			item_alias = 'meth_ass_2';
		end;
		else if upcase(strip(form_alias))='ORAD2' and upcase(compbl(itemquestion)) in ('START DATE') and prefix='DT' and controllevel = '1' then do; 
			item_alias = 'dt_orad';
		end;
		else if upcase(strip(form_alias))='ORAD2' and upcase(compbl(itemquestion)) in ('START DATE') and prefix='DTS' and controllevel = '1' then do; 
			item_alias = 'dts_orad';
		end;
		else if upcase(strip(form_alias))='ORAD2' and upcase(compbl(itemquestion)) in ('REASON FOR RADIATION') and prefix='CD' and controllevel = '1' then do; 
			item_alias = 'radi_cat';
		end;
		else if upcase(strip(form_alias))='ORAD2' and upcase(compbl(itemquestion)) in ('TREATMENT CATEGORY') and prefix='CD' and controllevel = '1' then do; 
			item_alias = 'radi_reason';
		end;
        else if upcase(compbl(itemquestion)) in ('DATE OF INITIAL IDENTIFICATION') and prefix='DT' and controllevel = '1' then do;
			item_alias = 'dt_main';
		end;
        else if upcase(compbl(itemquestion)) in ('DATE OF LESION EVALUATION') and prefix='DT' and controllevel = '1' then do;
			item_alias = 'dt_add';
		end;
        else if upcase(compbl(itemquestion)) in ('LESION CATEGORY','TUMOR IDENTIFICATION') and prefix='CD' and controllevel = '1' then do;
			item_alias = 'ident';
		end;
        else if upcase(compbl(itemquestion)) in ('LESION NUMBER') and prefix='CD' and controllevel = '1' then do;
			item_alias = 'lesionbr_ini';
		end;
        else if upcase(compbl(itemquestion)) in ('SPONSOR ID NUMBER') and prefix='CD' and controllevel = '1' then do;
			item_alias = 'sponsorid';
		end;
        else if upcase(compbl(itemquestion)) in ('INDICATE IF LESION MERGED OR SPLIT') and prefix='CD' and controllevel = '1' then do;
			item_alias = 'mergsplit_rc';
		end;
        else if upcase(compbl(itemquestion)) in ('INDICATE IF LESION MERGED OR SPLIT') and prefix='CD' and controllevel = '2' then do;
			item_alias = 'split_tb';
		end;
        else if upcase(compbl(itemquestion)) in ('INDICATE IF LESION MERGED OR SPLIT') and substr(COMPRESS(columnname,,'kd'),1,1)='1' and prefix='CD' and controllevel = '3' then do;
			item_alias = 'merg_tb1';
		end;
        else if upcase(compbl(itemquestion)) in ('INDICATE IF LESION MERGED OR SPLIT') and substr(COMPRESS(columnname,,'kd'),1,1)='2' and prefix='CD' and controllevel = '3' then do;
			item_alias = 'merg_tb2';
		end;
        else if upcase(compbl(itemquestion)) in ('INDICATE IF LESION MERGED OR SPLIT') and substr(COMPRESS(columnname,,'kd'),1,1)='3' and prefix='CD' and controllevel = '3' then do;
			item_alias = 'merg_tb3';
		end;
        else if upcase(compbl(itemquestion)) in ('INDICATE IF LESION MERGED OR SPLIT') and substr(COMPRESS(columnname,,'kd'),1,1)='4' and prefix='CD' and controllevel = '3' then do;
			item_alias = 'merg_tb4';
		end;
        else if upcase(compbl(itemquestion)) in ('INDICATE IF LESION MERGED OR SPLIT') and substr(COMPRESS(columnname,,'kd'),1,1)='5' and prefix='CD' and controllevel = '3' then do;
			item_alias = 'merg_tb5';
		end;
		else if upcase(compbl(itemquestion)) in ('START DATE OF REGIMEN') and prefix='DT' and controllevel = '1' then do;
			item_alias = 'dt_treat_reg';
		end;
		else if upcase(compbl(itemquestion)) in ('START DATE OF REGIMEN') and prefix='DTS' and controllevel = '1' then do;
			item_alias = 'dts_treat_reg';
		end;
		else if upcase(compbl(itemquestion)) in ('START DATE OF MEDICATION') and prefix='DT' and controllevel = '1' then do;
			item_alias = 'dt_treat_med';
		end;
		else if upcase(compbl(itemquestion)) in ('START DATE OF MEDICATION') and prefix='DTS' and controllevel = '1' then do;
			item_alias = 'dts_treat_med';
		end;
        else if upcase(compbl(itemquestion)) in ('DATE OF SURGERY') and prefix='DT' and controllevel = '1' then do;
			item_alias = 'dt_osof';
		end;
        else if upcase(compbl(itemquestion)) in ('DATE OF SURGERY') and prefix='DTS' and controllevel = '1' then do;
			item_alias = 'dts_osof';
		end;
        else if upcase(strip(form_alias))='RNT' and upcase(compbl(itemquestion)) in ('DATE OF ASSESSMENT') and prefix='DT' and controllevel = '1' then do;
			item_alias = 'dt_ass';
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
	data sr_0;
		format subjectid best12. visitid best12. visitorder best12. visitmnemonic $4000. formid best12. formmnemonic $4000. formidx_m best12. itemsetidx_a best12. 
        	   dt_ass datetime20.;
		stop;
	run;

	data lsn_0;
		format subjectid best12. visitid best12. visitorder best12. visitmnemonic $4000. formid best12. formmnemonic $4000. formidx_m best12. itemsetidx_a best12. 
        	   dt_main datetime20. dt_add datetime20. ident $500. lesionbr $50. sponsorid best12. meth_ass_1 $500. meth_ass_2 $500.
        	   mergsplit_rc $50. merg_tb1 $50. merg_tb2 $50. merg_tb3 $50. merg_tb4 $50. merg_tb5 $50. split_tb $50.;
		stop;
	run;

	data pms1_0;
		format subjectid best12. visitid best12. visitorder best12. visitmnemonic $4000. formid best12. formmnemonic $4000. formidx_m best12. itemsetidx_a best12. 
               dt_ass datetime20. dt_dov datetime20. trial_seg $4000.;
		stop;
	run;

	data pms1a_0;
		format subjectid best12. visitid best12. visitorder best12. visitmnemonic $4000. formid best12. formmnemonic $4000. formidx_m best12. itemsetidx_a best12. 
               dt_ass datetime20. trial_seg $4000.;
		stop;	
	run;

	data odbf_0;
		format subjectid best12. visitid best12. visitorder best12. visitmnemonic $4000. formid best12. formmnemonic $4000. formidx_m best12. itemsetidx_a best12. 
               dt_treat_reg datetime20.  dt_treat_med datetime20. dts_treat_reg $200. dts_treat_med $200. 
               treat_dt_actual datetime20. treat_dt_first datetime20. treat_dt_last datetime20. treat_dts $200.;
		stop;
	run;

	data orad2_0;
		format subjectid best12. visitid best12. visitorder best12. visitmnemonic $4000. formid best12. formmnemonic $4000. formidx_m best12. itemsetidx_a best12. 
			   dt_orad datetime20. dts_orad $200. radi_reason $4000. radi_cat $4000.
               orad_dt_actual datetime20. orad_dt_first datetime20. orad_dt_last datetime20.  orad_dts $200.;
		stop;
	run;

	data osof_0;
		format subjectid best12. visitid best12. visitorder best12. visitmnemonic $4000. formid best12. formmnemonic $4000. formidx_m best12. itemsetidx_a best12. 
		       dt_osof datetime20. dts_osof $200.
			   osof_dt_actual datetime20. osof_dt_first datetime20. osof_dt_last datetime20.  osof_dts $200.;
		stop;
	run;

	data rnt_0;
		format subjectid best12. visitid best12. visitorder best12. visitmnemonic $4000. formid best12. formmnemonic $4000. formidx_m best12. itemsetidx_a best12. 
		       dt_ass datetime20.;
		stop;
	run;

	%macro gdataset;
	%GLOBAL lsnformdis;
	%if &dic_cnt>0 %then %do; 
		proc sql;
			connect to oracle as dbtest (user=PDAMREAD orapw="&orpass" path=&dbpth connection=global);

			%do i = 1 %to &ecrf_nbr;
				%if &&viewmain&i ne &&viewadd&i %then %do;
					create table &&formalias&i.._&i as select * from connection to dbtest
					(select v.*,d.dt_dov from
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
						(select &&columnlst&i,FORMIDX_m,0 as ITEMSETIDX_a,d.dt_dov 
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

		%do i = 1 %to &ecrf_nbr;
			%if %sysfunc(exist(lsn_&i)) %then %do;
				data lsn_&i(drop=lesionbr_ini);
				    set lsn_&i;
					if VTYPE(lesionbr_ini) = 'N' then lesionbr=put(strip(lesionbr_ini),20.);
					else lesionbr=lesionbr_ini;
				run;
			%end; 
		%end;

		data lsn_ini (drop=dt_main dt_add);
			set lsn_:;
			%if %length(&lsnform) gt 0  %then %do;
			    %let lsnformdis = %sysfunc(upcase(&lsnform));
				%let lsnformlist = %sysfunc(catq(1ac,&lsnformdis));
				where formmnemonic in (&lsnformlist);
			%end;
			%else %do;
				%let lsnformdis = All;
            %end;
            main_dt=datepart(dt_main);
			add_dt=datepart(dt_add);
			format main_dt date9.;	
			format add_dt date9.;	
		run;
		data sr (drop=dt_ass);
			set sr_:;
			if not missing(dt_ass); 
			ass_dt=datepart(dt_ass);
			format ass_dt date9.;
		run;
		data pms1 (drop=dt_ass dt_dov);
			set pms1_:;
            ass_dt=datepart(dt_ass);
			dov_dt=datepart(dt_dov);
			format ass_dt date9.;
			format dt_dov date9.;	
		run;
		data pms1a (drop=dt_ass);
			set pms1a_:;
			if not missing(dt_ass);
			ass_dt=datepart(dt_ass);
			format ass_dt date9.;
		run;
		data odbf (drop=treat_dts_first);
			set odbf_:;
			if not missing(coalescec(dts_treat_reg,dts_treat_med)) or not missing(coalesce(dt_treat_reg,dt_treat_med));  
			treat_dt_actual=datepart(coalesce(dt_treat_reg,dt_treat_med));
			treat_dts =coalescec(coalescec(dts_treat_reg,dts_treat_med),tranwrd(put(treat_dt_actual,yymmdd10.),'-','/'));
			treat_dts_first=tranwrd(treat_dts,'UNK','01');
			treat_dt_first=input(treat_dts_first,yymmdd10.);
			if length(coalescec(dts_treat_reg,dts_treat_med)) = 11 then do;
				treat_dt_last=intnx ('month',treat_dt_first,0,'E');
			end;
			else if length(coalescec(dts_treat_reg,dts_treat_med)) = 12 then do;
                treat_dt_last=intnx ('year',treat_dt_first,0,'E');
			end;
            else do;
                treat_dt_last= treat_dt_first;
			end;
			format treat_dt_actual date9.;
			format treat_dt_first date9.;
			format treat_dt_last date9.;	
		run;
		data orad (drop=orad_dts_first);
		    set orad2_:;
			if not missing(dts_orad) or not missing(dt_orad)
              and FINDW(coalescec(strip(radi_reason),'BLANK'),'PALLIATIVE',' ','i') =0
			  and FINDW(coalescec(strip(radi_cat),'BLANK'),'PALLIATIVE',' ','i') =0;
            orad_dt_actual=	datepart(dt_orad);
			orad_dts=coalescec(dts_orad,tranwrd(put(orad_dt_actual,yymmdd10.),'-','/'));
			orad_dts_first=tranwrd(orad_dts,'UNK','01');
			orad_dt_first=input(orad_dts_first,yymmdd10.);
			if length(dts_orad) = 11 then do;
				orad_dt_last=intnx ('month',orad_dt_first,0,'E');
			end;
			else if length(dts_orad) = 12 then do;
                orad_dt_last=intnx ('year',orad_dt_first,0,'E');
			end;
            else do;
                orad_dt_last= orad_dt_first;
			end;
			format orad_dt_actual date9.;
			format orad_dt_first date9.;
			format orad_dt_last date9.;
		run;
		data osof (drop=osof_dts_first);
			set osof_:;
			if not missing(dts_osof) or not missing(dt_osof);
            osof_dt_actual=datepart(dt_osof);
			osof_dts=coalescec(dts_osof,tranwrd(put(osof_dt_actual,yymmdd10.),'-','/'));
			osof_dts_first=tranwrd(osof_dts,'UNK','01');
			osof_dt_first=input(osof_dts_first,yymmdd10.);
			if length(dts_osof) = 11 then do;
				osof_dt_last=intnx ('month',osof_dt_first,0,'E');
			end;
			else if length(dts_osof) = 12 then do;
                osof_dt_last=intnx ('year',osof_dt_first,0,'E');
			end;
            else do;
                osof_dt_last= osof_dt_first;
			end;
			format osof_dt_actual date9.;
			format osof_dt_first date9.;
			format osof_dt_last date9.;
		run;
		data rnt (drop=dt_ass);
			set rnt_:;
			if not missing(dt_ass);
			ass_dt=datepart(dt_ass);
			format ass_dt date9.;
		run;
    %end;

	%do i = 0 %to &ecrf_nbr;
		%movetable(sr_ini_&i lsn_ini_&i treat_&i orad_&i osof_&i rnt_&i);
	%end;

	%mend;
	%gdataset;

	proc sql;
		create table tos_combine as
		  select distinct subjectid, formmnemonic,tos_seq, tos_dt_dis, tos_dt_actual format=date9., tos_dt_last format=date9., tos_dt_first format=date9.
	        from (select subjectid, formmnemonic, formidx_m as tos_seq, treat_dts as tos_dt_dis, treat_dt_actual as tos_dt_actual, treat_dt_last as tos_dt_last, treat_dt_first as tos_dt_first from odbf union all
				  select subjectid, formmnemonic, formidx_m as tos_seq, orad_dts as tos_dt_dis, orad_dt_actual as tos_dt_actual, orad_dt_last as tos_dt_last, orad_dt_first as tos_dt_first from orad union all
				  select subjectid, formmnemonic, formidx_m as tos_seq, osof_dts as tos_dt_dis, osof_dt_actual as tos_dt_actual, osof_dt_last as tos_dt_last, osof_dt_first as tos_dt_first from osof union all
				  select subjectid, formmnemonic, 1 as tos_seq, tranwrd(put(ass_dt,yymmdd10.),'-','/') as tos_dt_dis, ass_dt as tos_dt_actual, ass_dt as tos_dt_last, ass_dt as tos_dt_first from pms1a
				  )
	       ;
	quit;

%* --- 4. Process LSN dataset considering merge split --- *;

    data lsn_temp;
		set lsn_ini;
		if VTYPE(sponsorid) = 'N' then sponsorid_c=put(strip(sponsorid),20.);else sponsorid_c=sponsorid;
		if VTYPE(lesionbr) = 'N' then lesionbr_c=put(strip(lesionbr),20.);else lesionbr_c=lesionbr;
		split_merg=cats('|',catx('|',merg_tb1,merg_tb2,merg_tb3,merg_tb4,merg_tb5,split_tb),'|');
	run;

	proc sql;
		create table lsn_sm as
			select distinct subjectid, formmnemonic, mergsplit_rc, split_merg, main_dt,sponsorid_c, lesionbr_c
	          from lsn_temp 
	         where split_merg ne '||';
		create table lsn as
			select L1.subjectid, L1.formmnemonic, L1.formidx_m, L1.itemsetidx_a, L1.ident, L1.lesionbr_c,L1.sponsorid_c,L1.main_dt,L1.add_dt, L1.meth_ass_1, L1.meth_ass_2, case when L1.split_merg='||' then '' else L1.split_merg end as sm_from,
	               L2.sponsorid_c as smto_spid, L2.lesionbr_c as smto_lsnbr,L2.split_merg as smto_tb, L2.main_dt as split_merg_dt
			  from lsn_temp L1 left join lsn_sm L2
			    on L1.subjectid = L2.subjectid
			   and L1.formmnemonic = L2.formmnemonic
	           and (FINDW(L2.split_merg,STRIP(L1.sponsorid_c),'|','i')>0 or FINDW(L2.split_merg,STRIP(L1.lesionbr_c),'|','i')>0);
	quit;
	%movetable(lsn_temp lsn_sm);

%* --- 5. Get treatment phase by subject--- *;
	proc sql;
		create table phase_dov as
			select distinct subjectid, visitid, VISITMNEMONIC, dt_dov as dt_tpdtstr, s.tporder, s.tpname 
              from phase_csv s, dov d
			 where s.tpvisit=upcase(strip(d.VISITMNEMONIC))
			   and d.err_visit is missing
               and d.dt_dov is not null;
	quit;

	proc sort data = phase_dov;
		by subjectid descending dt_tpdtstr;
	run;

	data subj_tp (drop=dt_tpdtstr);
	    format next_tporder $100. next_tpname $100. next_tpdtstr date9. tpdtstr date9.;
        set phase_dov;
		by subjectid descending dt_tpdtstr;
		next_tporder = lag(tporder);
		next_tpname = lag(tpname);
		next_tpdtstr = datepart(lag(dt_tpdtstr));
		if first.subjectid then do;
		    next_tporder = '';
			next_tpname = '';
			next_tpdtstr = date();
		end;
		tpdtstr=datepart(dt_tpdtstr);
	run;

	proc sort data = subj_tp;
		by subjectid tpdtstr;
	run;

	data subj_tp;
	    format pre_tporder $100. pre_tpname $100. pre_tpdtstr date9. wkgap best12.;
        set subj_tp;
		by subjectid tpdtstr;
		pre_tporder = lag(tporder);
		pre_tpname = lag(tpname);
		pre_tpdtstr = lag(tpdtstr);
		if first.subjectid then do;
		    pre_tporder = '';
			pre_tpname = '';
			pre_tpdtstr = input('01JAN1960',date9.);
		end;
		wkgap = floor(max(next_tpdtstr-tpdtstr+1)/7);
	run;

%* --- 6. Get pms1_tp/pms1a_tp/lsn_tp with treatment phase info--- *;
	data pms1a oedra;
		set pms1a;
		if formmnemonic='PMS1A' then output pms1a;
		else output oedra;
	run;

	proc sql;
		create table pms1_tp as
			select p.*,t.tporder,t.tpdtstr,t.visitmnemonic as tpvisit
			  from pms1 p, subj_tp t
			   where p.subjectid = t.subjectid
			   and p.ass_dt >= t.tpdtstr 
		       and p.ass_dt <  t.next_tpdtstr; 
		create table pms1a_tp as
			select p.*,t.tporder
			  from pms1a p, subj_tp t
			 where p.subjectid = t.subjectid
			   and p.ass_dt >= t.tpdtstr 
		       and p.ass_dt <  t.next_tpdtstr;
		create table pms1a_tp_supp as
			select p.*,s.scenario
			  from pms1a_tp p,onc_lsn_csv s
			 where p.tporder = s.tporder
			   and coalescec(upper(strip(p.trial_seg)),'BLANK') = s.pmsa_seg;
		create table tos_tp as
			select p.*,t.tporder,t.tpdtstr,t.visitmnemonic as tpvisit
			  from tos_combine p, subj_tp t
			   where p.subjectid = t.subjectid
			   and p.tos_dt_last >= t.tpdtstr 
		       and p.tos_dt_last <  t.next_tpdtstr; 
		create table tos_tp_ini as 
		    select t.*,
		          min(tos_dt_last) as min_tos_dt_last format=date9., 
				  min(tos_dt_first) as min_tos_dt_first format=date9. 
		     from tos_tp t
		   group by subjectid,tporder,formmnemonic;
        create table tos_ini as    
           select * from tos_tp_ini
           where tos_dt_last=min_tos_dt_last
           order by subjectid, formmnemonic, tos_seq; 
		create table lsn_tp_temp as
			select l.*,t.tporder,t.tpname, t.tpdtstr, t.next_tpdtstr, t.visitmnemonic as tpvisit
			  from lsn l, subj_tp t
			 where l.subjectid = t.subjectid
			   and case when (l.sm_from is null and upcase(strip(l.ident)) not like 'NEW%') and l.main_dt gt pre_tpdtstr and l.main_dt le t.tpdtstr then 1
			            when (l.sm_from is not null or upcase(strip(l.ident)) like 'NEW%') and l.main_dt gt t.tpdtstr and l.main_dt le t.next_tpdtstr then 1
						else 0 end =1 ;
		create table lsn_main_tp as 
			select distinct l.subjectid,tporder,tpname,tpvisit,tpdtstr,next_tpdtstr,s.ass_dt as srdt,l.formmnemonic,l.formidx_m,ident,lesionbr_c,sponsorid_c,main_dt,sm_from,split_merg_dt as smto_dt
	          from lsn_tp_temp l left join sr s
                on l.subjectid = s.subjectid;
	quit;

    data pms1a_tp_supp_s1 pms1a_tp_supp_s2;
		set pms1a_tp_supp;
		if scenario='1' then output pms1a_tp_supp_s1;
		else output pms1a_tp_supp_s2;
	run;

	%let maxwk=0;
	proc sql noprint;
	   select distinct coalescec(put(floor(max(date()- tpdtstr+1)/7),8.),'0') into: maxwk from subj_tp;
    quit;

	data onc_lsn_csv_chk2 (drop=method_ass); /*remove method to reduce loop*/
		set onc_lsn_csv;
		if scenario=2 then do;
			stp_wk=strip(coalesce(strip(TRANWRD(stp_wk,'NA',strip(&maxwk))),'0'));
		end;
	run;

	data ass_method_csv (keep = method_group method_ass scenario);
		set onc_lsn_csv;
	run;

	proc sort data = onc_lsn_csv_chk2 nodupkey;
		by _ALL_;;
	run;

%* --- 7. Proceed Criteria--- *;
%* --- 7.1 Check if Criteria is existed or not based on supporting doc  --- *;

	proc sql noprint;
		select count(distinct cats(criteria_form1,criteria_item1)) into: cnt_c from onc_lsn_csv where criteria_form1 ne 'NA' or criteria_form2 ne 'NA' or criteria_form3 ne 'NA';
	quit;
	%put &cnt_c;
	%if &cnt_c > 0 %then %do;
		data onc_lsn_c (keep = criteria_form1 criteria_item1 criteria_form2 criteria_item2 criteria_form3 criteria_item3);
			set onc_lsn_csv;
			if criteria_form1 ne 'NA' or criteria_form2 ne 'NA' or criteria_form3 ne 'NA';
		run;

		proc sort data = onc_lsn_c nodupkey;
			by criteria_form1 criteria_item1 criteria_form2 criteria_item2 criteria_form3 criteria_item3;
		run;
		proc sql;
		    create table criteria_table as 
			select 1 as criteria_seq, 'criteria_form1' as form_col, 'criteria_item1' as item_col, criteria_form1 as criteria_form, criteria_item1 as criteria_item
			  from onc_lsn_c
			 where criteria_form1 ne 'NA'
			union all 
			select 2 as criteria_seq, 'criteria_form2' as form_col, 'criteria_item2' as item_col, criteria_form2 as criteria_form, criteria_item2 as criteria_item
			  from onc_lsn_c
			 where criteria_form2 ne 'NA'
			union all 
			select 3 as criteria_seq, 'criteria_form3' as form_col, 'criteria_item3' as item_col, criteria_form3 as criteria_form, criteria_item3 as criteria_item
			  from onc_lsn_c
			 where criteria_form3 ne 'NA';
	    quit;
		proc sort data = criteria_table nodupkey;
			by criteria_seq form_col item_col criteria_form criteria_item ;
		run;


%* --- 7.2 Get Criteria Form and Item from cv_datadictionary based on supporting doc  --- *;
		%datadic(criteria_table, criteria_form, criteria_item);
		proc sort data = dictionary;
			by formmnemonic itemquestion columnname;
		run;
		
		data dic (drop = formmnemonic itemquestion);
			set dictionary;
			criteria_form = upcase(formmnemonic);
			criteria_item = upcase(itemquestion);
		run;

		proc sql;
		create table onc_lsn_csv_chk3 as
			select c.*, 
                   d1.viewname as criteria_viewname1, d1.columnname as criteria_columnname1, d1.columnlist as criteria_columnlist1,
				   d2.viewname as criteria_viewname2, d2.columnname as criteria_columnname2, d2.columnlist as criteria_columnlist2,
				   d3.viewname as criteria_viewname3, d3.columnname as criteria_columnname3, d3.columnlist as criteria_columnlist3
			  from onc_lsn_csv_chk2 c
			  left join dic d1
			    on c.criteria_form1 = d1.criteria_form
			   and c.criteria_item1 = d1.criteria_item
			  left join dic d2
			    on c.criteria_form2 = d2.criteria_form
			   and c.criteria_item2 = d2.criteria_item
			  left join dic d3
			    on c.criteria_form3 = d3.criteria_form
			   and c.criteria_item3 = d3.criteria_item;
		quit;
	%end;
	%else %do;
		data onc_lsn_csv_chk3;
			set onc_lsn_csv_chk2;
			format criteria_viewname1 $500. criteria_columnname1 $500. criteria_columnlist1 $500.
				   criteria_viewname2 $500. criteria_columnname2 $500. criteria_columnlist2 $500.
                   criteria_viewname3 $500. criteria_columnname3 $500. criteria_columnlist3 $500.;
			criteria_viewname1='NA'; criteria_columnname1='NA'; criteria_columnlist1='NA';
			criteria_viewname2='NA'; criteria_columnname2='NA'; criteria_columnlist2='NA';
			criteria_viewname3='NA'; criteria_columnname3='NA'; criteria_columnlist3='NA';
		run;
	%end;

%* --- 7.3 Loop supporting doc to get final dataset  --- *;
	data final_1;
		format subjectid best12. VISITMNEMONIC $4000. formmnemonic $100. dov_dt date9. tporder $100. tpdtstr date9. tpvisit $100. 
        trial_seg $4000. pmsa_seg $500. formidx_m best12. ident $500. expfram $200. criteria_val1 $500. criteria_val2 $500. criteria_val3 $500.;
		stop;
	run;

	data final_2;
		format subjectid best12. start_point $4000. tporder $100. start_date date9. wknbr best12. formmnemonic $4000. formidx_m best12. ident $500. expfram $200. criteria_val1 $500. criteria_val2 $500. criteria_val3 $500.
        cut_form $100. cut_seq best12. cut_date $200. dt_oedra date9. dt_pms1a date9.;
        stop;
	run;

	data _null_;
	   set onc_lsn_csv_chk3 end = last;
	      call symputx('tporder_'||left(_n_),strip(tporder));
	      call symputx('startflag_'||left(_n_),strip(startflag));
	      call symputx('lsn_frm_'||left(_n_),strip(lsn_frm));
	      call symputx('pms1_seg_'||left(_n_),strip(pms1_seg));
		  call symputx('pmsa_seg_'||left(_n_),strip(pmsa_seg));
		  call symputx('low_day_'||left(_n_),strip(low_day));
		  call symputx('upper_day_'||left(_n_),strip(upper_day));
		  call symputx('freq_'||left(_n_),strip(freq));
		  call symputx('str_wk_'||left(_n_),strip(str_wk));
		  call symputx('stp_wk_'||left(_n_),strip(stp_wk));
		  call symputx('treat_frm_'||left(_n_),strip(treat_frm));
		  call symputx('orad_frm_'||left(_n_),strip(orad_frm));
		  call symputx('surg_frm_'||left(_n_),strip(surg_frm));
		  call symputx('method_group_'||left(_n_),strip(method_group));
		  call symputx('scenario_'||left(_n_),strip(scenario));
		  call symputx('criteria_viewname1_'||left(_n_),criteria_viewname1);
	      call symputx('criteria_form1_'||left(_n_),criteria_form1);
	      call symputx('criteria_item1_'||left(_n_),criteria_item1);
	      call symputx('criteria_colname1_'||left(_n_),criteria_columnname1);
	      call symputx('criteria_collist1_'||left(_n_),criteria_columnlist1);
	      call symputx('criteria_value1_'||left(_n_),compress(criteria_val1));

		  call symputx('criteria_viewname2_'||left(_n_),criteria_viewname2);
	      call symputx('criteria_form2_'||left(_n_),criteria_form2);
	      call symputx('criteria_item2_'||left(_n_),criteria_item2);
	      call symputx('criteria_colname2_'||left(_n_),criteria_columnname2);
	      call symputx('criteria_collist2_'||left(_n_),criteria_columnlist2);
	      call symputx('criteria_value2_'||left(_n_),compress(criteria_val2));

		  call symputx('criteria_viewname3_'||left(_n_),criteria_viewname3);
	      call symputx('criteria_form3_'||left(_n_),criteria_form3);
	      call symputx('criteria_item3_'||left(_n_),criteria_item3);
	      call symputx('criteria_colname3_'||left(_n_),criteria_columnname3);
	      call symputx('criteria_collist3_'||left(_n_),criteria_columnlist3);
	      call symputx('criteria_value3_'||left(_n_),compress(criteria_val3));

	   if last then call symputx('supp_col_cnt',_n_);
	run;


	%do i = 1 %to &supp_col_cnt;
		%do k = 1 %to 3; /*criteria dataset*/
			%if &&criteria_form&k._&i ne NA %then %do; 
				proc sql;
				   connect to oracle as dbtest (user=PDAMREAD orapw="&orpass" path=&dbpth connection=global);

				   create table criteria_viewname&k._&i as select * from connection to dbtest
				      (
						select subjectid, visitid, visitmnemonic, formid, formmnemonic, 
							&&criteria_colname&k._&i as criteria, %bquote('&&criteria_item&k._&i') as itemquestion, 
							&&criteria_collist&k._&i
						from &protocol.&id2..&&criteria_viewname&k._&i
						where formmnemonic = %bquote('&&criteria_form&k._&i')
						and &&criteria_colname&k._&i is not null
				      );
				quit;

				data criteria_viewname&k._&i;
					set criteria_viewname&k._&i;
					if missing(deletedform) or deletedform = 'N';
					if missing(deleteditem) or deleteditem = 'N';
					if compress(upcase(trim(&&criteria_colname&k._&i))) = "&&criteria_value&k._&i";
				run;

				proc sort data = criteria_viewname&k._&i;
					by subjectid visitid formidx itemsetidx;
				run;

				data criteria_viewname&k._&i (keep = subjectid form item value visitid formidx);
					merge criteria_viewname&k._&i(in=a) dov(in=b);
					by subjectid visitid;
					if a and missing(err_visit);
					rename formmnemonic = form;
					rename itemquestion = item;
					rename criteria = value;
				run;
			%end;
		%end;

		%if "&&method_group_&i" ne "NA" %then %do;
			proc sql;
				create table lsn_tp as
					select *
					  from lsn_tp_temp
					 where upcase(strip(meth_ass_1)) ne "OTHER"
					   and upcase(strip(meth_ass_2)) in (select method_ass from ass_method_csv where method_group="&&method_group_&i" and scenario="&&scenario_&i");
			quit;
		%end;
		%else %do;
			data lsn_tp;
				set lsn_tp_temp;
			run;
		%end;

		%if "&&scenario_&i" = "1" %then %do;
			proc sql;
				create table pms1_explist as
				    select p.*,l.formidx_m,l.ident  
					  from (select p.subjectid, p.VISITMNEMONIC, p.formmnemonic, p.dov_dt, p.tporder, p.tpdtstr,p.tpvisit, 
                                   p.trial_seg, "&&lsn_frm_&i" as lsn_frm, "&&pmsa_seg_&i" as pmsa_seg,
				                   (p.dov_dt-coalesce(input("&&low_day_&i",8.),0)) as low_exp_dt format=date9.,
								   case when "&&upper_day_&i"="NA" then date()
                                        else (p.dov_dt+coalesce(input("&&upper_day_&i",8.),0)) end as upper_exp_dt format=date9.,
								   %if "&&criteria_form1_&i"="NA" %then %do;
								   		'NA' as criteria_val1,
								   %end;
                                   %else %do;
								   		c1.value as criteria_val1,
                                   %end; 
								   %if "&&criteria_form2_&i"="NA" %then %do;
								   		'NA' as criteria_val2,
								   %end;
                                   %else %do;
								   		c2.value as criteria_val2,
                                   %end; 
								   %if "&&criteria_form3_&i"="NA" %then %do;
								   		'NA' as criteria_val3
								   %end;
                                   %else %do;
								   		c3.value as criteria_val3
                                   %end; 
							  from pms1_tp p
                              %if "&&criteria_form1_&i" ne "NA" %then %do;
                                  inner join criteria_viewname1_&i c1
								    on p.subjectid = c1.subjectid
							  %end;
                              %if "&&criteria_form2_&i" ne "NA" %then %do;
                                  inner join criteria_viewname2_&i c2
								    on p.subjectid = c2.subjectid
							  %end;
                              %if "&&criteria_form3_&i" ne "NA" %then %do;
                                  inner join criteria_viewname3_&i c3
								    on p.subjectid = c3.subjectid
							  %end;
							 where upcase(strip(coalescec(p.trial_seg,'BLANK')))= "&&pms1_seg_&i"
							   and coalescec(p.tporder,'BLANK')="&&tporder_&i"
							   and p.dov_dt is not null
							)p inner join lsn_main_tp l
					    on p.subjectid = l.subjectid
					   and p.tporder = l.tporder
					   and p.lsn_frm = l.formmnemonic;

				create table final_1_&i as
					select p.subjectid, p.VISITMNEMONIC, p.formmnemonic, p.dov_dt, p.tporder, p.tpdtstr, p.tpvisit, p.trial_seg, p.pmsa_seg,
		                   p.formidx_m, p.ident, catx(' to ',put(p.low_exp_dt,date9.),put(p.upper_exp_dt,date9.)) as expfram, p.criteria_val1, p.criteria_val2, p.criteria_val3
					  from pms1_explist p 

		              left join lsn_tp l
					    on l.subjectid=p.subjectid
		               and l.tporder=p.tporder
					   and l.formmnemonic=p.lsn_frm
					   and l.formidx_m=p.formidx_m
					   and l.add_dt ge low_exp_dt
					   and l.add_dt le upper_exp_dt 
					  %if "&&pmsa_seg_&i" ne "NA" %then %do;
						  left join pms1a_tp_supp_s1 a
					  %end;
					  %else %do;
						  left join pms1a_tp a
					  %end;
			                on a.subjectid=p.subjectid
						   and a.tporder=p.tporder
					  %if &cutoff_exclude ne 1 %then %do; 
					   	  and a.ass_dt le p.low_exp_dt 
			          %end;

					   left join oedra o
		                 on o.subjectid=p.subjectid
					  %if &cutoff_exclude ne 2 %then %do; 
						and o.ass_dt le low_exp_dt 
					  %end;
					   where l.subjectid is null
					    %if &cutoff_exclude ne 1 %then %do; 
					     and a.subjectid is null
						%end;
                        %if &cutoff_exclude ne 2 %then %do; 
						 and o.subjectid is null
						%end;
						 and 1=1;
		     quit;
			 proc append data=final_1_&i base=final_1 force; run;
			 proc datasets memtype=data noprint; delete final_1_&i final_1_&i / memtype=data; quit; 	
		%end;
		%else %if "&&scenario_&i" = "2" %then %do;

			data tos_ini_&i;
			    set tos_ini;
				where formmnemonic eq "&&treat_frm_&i" or formmnemonic eq "&&orad_frm_&i"  or formmnemonic eq "&&surg_frm_&i";
			run;

			proc sort data=tos_ini_&i;
				by subjectid tporder formmnemonic tos_seq;

			run;

			data tos_&i;
			    set tos_ini_&i;
				by subjectid tporder formmnemonic tos_seq;
				if first.subjectid;
			run;

		    data list;
			    %let j=1;			
				%do %until(%eval(&&str_wk_&i) + (&j-1)*%eval(&&freq_&i)>%eval(&&stp_wk_&i));
					wknbr=%eval(&&str_wk_&i) + (&j-1)*%eval(&&freq_&i);
					output;
					%let j=%eval(&j+1);
				%end;			
			run;
			proc sql;
			    create table lsn_main_tp_list as 
				    select l.*,
			               "&&pmsa_seg_&i" as pmsa_seg, "&&low_day_&i" as low_day, "&&upper_day_&i" as upper_day,  
                           "&&freq_&i" as freq, "&&str_wk_&i" as str_wk, "&&stp_wk_&i" as stp_wk, 
                           "&&treat_frm_&i" as treat_frm, "&&orad_frm_&i" as orad_frm, "&&surg_frm_&i" as surg_frm, wknbr,
						   case when "&&startflag_&i" = "SR" then 'SR' else tpvisit end as start_point, 
					       case when "&&startflag_&i" = "SR" then srdt else tpdtstr end as start_date format=date9., 
						   case when "&&startflag_&i" = "SR" then (l.srdt + wknbr*7) else (l.tpdtstr + wknbr*7) end as exp_dt format=date9.,                          
                           case when "&&startflag_&i" = "SR" then (l.srdt + wknbr*7-input("&&low_day_&i",8.)) 
                                else (l.tpdtstr + wknbr*7-input("&&low_day_&i",8.)) end as low_exp_dt format=date9.,
			               case when "&&startflag_&i" = "SR" then (l.srdt + wknbr*7+input("&&upper_day_&i",8.)) 
                                else (l.tpdtstr + wknbr*7+input("&&upper_day_&i",8.)) end as upper_exp_dt format=date9.,
						   %if "&&criteria_form1_&i"="NA" %then %do;
						   		'NA' as criteria_val1,
						   %end;
                           %else %do;
						   		c1.value as criteria_val1,
                           %end;
						   %if "&&criteria_form2_&i"="NA" %then %do;
						   		'NA' as criteria_val2,
						   %end;
                           %else %do;
						   		c2.value as criteria_val2,
                           %end;
						   %if "&&criteria_form3_&i"="NA" %then %do;
						   		'NA' as criteria_val3
						   %end;
                           %else %do;
						   		c3.value as criteria_val3
                           %end;
			          from lsn_main_tp l inner join list on 1=1
					 %if "&&criteria_form1_&i" ne "NA" %then %do;
                          inner join criteria_viewname1_&i c1
							on l.subjectid = c1.subjectid
					 %end;	
					 %if "&&criteria_form2_&i" ne "NA" %then %do;
                          inner join criteria_viewname2_&i c2
							on l.subjectid = c2.subjectid
					 %end;	
					 %if "&&criteria_form3_&i" ne "NA" %then %do;
                          inner join criteria_viewname3_&i c3
							on l.subjectid = c3.subjectid
					 %end;							 
					 where l.tporder = "&&tporder_&i"
			           and l.formmnemonic = "&&lsn_frm_&i";	

			    create table lsn_explist as
				    select * from lsn_main_tp_list f
			         where low_exp_dt ge tpdtstr
					   and upper_exp_dt lt next_tpdtstr
			           and low_exp_dt ge f.main_dt
			           and (smto_dt is null or smto_dt is not null and upper_exp_dt le smto_dt)
			         order by subjectid,tporder,formmnemonic,formidx_m,wknbr;

				create table final_2_&i as
				   select e.subjectid, e.start_point, e.tporder, e.start_date, e.wknbr, e.formmnemonic, e.formidx_m, e.ident, catx(' to ',put(low_exp_dt,date9.),put(upper_exp_dt,date9.)) as expfram, criteria_val1, criteria_val2, criteria_val3,
				   		  t.formmnemonic as cut_form, t.tos_seq as cut_seq, t.tos_dt_dis as cut_date, do.ass_dt as dt_oedra, da.ass_dt as dt_pms1a

                     from lsn_explist e 

	                 left join tos_&i t
					   on e.subjectid = t.subjectid
					   and e.tporder = t.tporder 

	                 left join lsn_tp l
	                   on l.subjectid = e.subjectid
				      and l.tporder = e.tporder
				      and l.formmnemonic = e.formmnemonic
				      and l.formidx_m = e.formidx_m
				      and l.add_dt ge e.low_exp_dt
				      and l.add_dt le e.upper_exp_dt
		         
					  %if "&&pmsa_seg_&i" ne "NA" %then %do;
						  left join pms1a_tp_supp_s2 a
					  %end;
					  %else %do;
						  left join pms1a_tp a
					  %end;
			                on a.subjectid=e.subjectid
						   and a.tporder=e.tporder
						   %if &cutoff_exclude ne 1 %then %do; 
						  	 and a.ass_dt le e.low_exp_dt
                           %end;					  	   	

					 left join oedra o
		               on o.subjectid=e.subjectid
					   %if &cutoff_exclude ne 2 %then %do; 
					       and o.ass_dt le low_exp_dt 
					   %end;

					 left join rnt r
					   on r.subjectid=e.subjectid

					 /*display pms1a oedra date */
                     %if "&&pmsa_seg_&i" ne "NA" %then %do;
						  left join pms1a_tp_supp_s2 da
					  %end;
					  %else %do;
						  left join pms1a_tp da
					  %end;
			                on da.subjectid=e.subjectid
						   and da.tporder=e.tporder

					 left join oedra do
		               on do.subjectid=e.subjectid

					where e.low_exp_dt lt coalesce(t.min_tos_dt_last,date())
					  and l.subjectid is null
					  %if &cutoff_exclude ne 1 %then %do; 
				      	and a.subjectid is null
					  %end;
					  %if &cutoff_exclude ne 2 %then %do; 
					  	and o.subjectid is null
					  %end;
                      and r.subjectid is null;	                     
			quit;
			proc append data=final_2_&i base=final_2 force; run;
			proc datasets memtype=data noprint; delete final_1_&i final_2_&i / memtype=data; quit; 	
		%end;
	%end;

%* --- 8. Final Dataset with subdataset filter  --- *;	
	%subdataset(subject);	
	
	proc sort data = final_1;
		by subjectid;
	run;

	proc sort data = final_2;
		by subjectid;
	run;

	data final_1;
		merge final_1(in=a) subject(in=b);
		by subjectid;
		if a and b;
	run;

	data final_2;
		merge final_2(in=a) subject(in=b);
		by subjectid;
		if a and b;
	run;	
	
	proc sort data = final_1 nodupkey;
		by country sitenbr subjnbr tporder tpdtstr dov_dt VISITMNEMONIC formmnemonic formidx_m ident expfram criteria_val1 criteria_val2 criteria_val3;
	run;

	proc sort data = final_2 nodupkey;
		by country sitenbr subjnbr tporder start_point start_date wknbr formmnemonic formidx_m ident expfram  criteria_val1 criteria_val2 criteria_val3 cut_form cut_seq cut_date dt_oedra dt_pms1a;
	run;
	
%* --- 9. Generate output to Excel --- *;

	%obscnt(final_1);

	%if &cutoff_exclude eq 1 %then %do; 
		%let cutoff_excludeids=PMS1A;
    %end;
	%else %if &cutoff_exclude eq 2 %then %do;
		%let cutoff_excludeids=OEDRA;
	%end;
	%else %do;
		%let cutoff_excludeids=;
	%end;

    %if &nobs=0 %then %do; 

		ods tagsets.excelxp  
		%if &putfil=NON %then &putfilnm;  
			options ( embedded_titles        =  'yes'
					  embedded_footnotes     =  'yes'
					  print_footer           =  'Page &amp;P of &amp;N'
					  sheet_name             =  'onc_lsn_003_jr_std_table_1'
					  orientation            =  'landscape'
					  absolute_column_width  =  '100');

		options formchar='|_' missing=' ' pageno=1 nobyline ls=160;
		title6	&titleformat "Lesion Evaluation Form: &lsnformdis";
		title7	&titleformat "Cut-off Exclude Form: &cutoff_excludeids";
		title8	&titleformat "onc_lsn_003_jr_std-table 1";
		title9	&titleformat "# of rows for Supporting Doc: &cnt_list";
		title10	&titleformat "Supporting Doc Page: &supppage; Study Phase Page: &spsupppage";

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
					  sheet_name             =  'onc_lsn_003_jr_std_table_1'
					  orientation            =  'landscape'
					  absolute_column_width  =  '20,10,15,30,15,20,15,50,50,50,50,50');
				  
		options formchar='|_' missing=' ' pageno=1 nobyline ls=160;
		title6	&titleformat "Lesion Evaluation Form: &lsnformdis";
		title7	&titleformat "Cut-off Exclude Form: &cutoff_excludeids";
		title8	&titleformat "onc_lsn_003_jr_std-table 1";
		title9	&titleformat "# of rows for Supporting Doc: &cnt_list";
		title10	&titleformat "Supporting Doc Page: &supppage; Study Phase Page: &spsupppage";

		proc report data=final_1 headline headskip spacing=1 split='*' missing
			style(report)={just=center font_face=times   font_size=1 cellspacing=2 borderwidth=2 background=white}
			style(header)={vjust=top   font_face=verdana font_size=2 font_weight=bold cellheight = 22 background=#7c98B0 
				foreground = white htmlstyle="text-align:center"}
			style(column)={just=center font_face=calibri background=white htmlstyle="text-align:center"};
		column country sitenbr subjnbr VISITMNEMONIC dov_dt formmnemonic formidx_m ident expfram criteria_val1 criteria_val2 criteria_val3;
		define country			/ display   width=20 'Country'	flow;
		define sitenbr			/ display   width=10 'Site' style(column)={tagattr='format:@'};
		define subjnbr			/ display	width=15 'Subject Number' style(column)={tagattr='format:@'};
		define VISITMNEMONIC	/ display   width=30 'Visit'	flow;
		define dov_dt        	/ display   width=15 'Date of Visit' flow;
		define formmnemonic		/ display   width=20 'Form'	flow;
		define formidx_m		/ display   width=15 'Seq' flow;
		define ident		    / display   width=50 'Lesion Identification' flow;
		define expfram			/ display   width=50 'Expected Timeframe'	flow;
		define criteria_val1	/ display   width=50 'Criteria Value1'	flow;
		define criteria_val2	/ display   width=50 'Criteria Value2'	flow;
		define criteria_val3	/ display   width=50 'Criteria Value3'	flow;

		run;			

	%end; /* End of &nobs > 0 */

	%obscnt(final_2);

	%if &nobs=0 %then %do; 

		ods tagsets.excelxp  
		options ( embedded_titles        =  'yes'
				  embedded_footnotes     =  'yes'
				  print_footer           =  'Page &amp;P of &amp;N'
				  sheet_name             =  'onc_lsn_003_jr_std_table_2'
				  orientation            =  'landscape'
				  absolute_column_width  =  '100');

		options formchar='|_' missing=' ' pageno=1 nobyline ls=160;
		title6	&titleformat "Lesion Evaluation Form: &lsnformdis";
		title7	&titleformat "Cut-off Exclude Form: &cutoff_excludeids";
		title8	&titleformat "onc_lsn_003_jr_std-table 2";
		title9	&titleformat "# of rows for Supporting Doc: &cnt_list";
		title10	&titleformat "Supporting Doc Page: &supppage; Study Phase Page: &spsupppage";

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
		options ( embedded_titles        =  'yes'
				  embedded_footnotes     =  'yes'
				  print_footer           =  'Page &amp;P of &amp;N'
				  sheet_name             =  'onc_lsn_003_jr_std_table_2'
				  orientation            =  'landscape'
				  absolute_column_width  =  '20,10,15,30,20,15,20,15,50,50,50,50,50,15,10,15,15,15');
				  
		options formchar='|_' missing=' ' pageno=1 nobyline ls=160;
		title6	&titleformat "Lesion Evaluation Form: &lsnformdis";
		title7	&titleformat "Cut-off Exclude Form: &cutoff_excludeids";
		title8	&titleformat "onc_lsn_003_jr_std-table 2";
		title9	&titleformat "# of rows for Supporting Doc: &cnt_list";
		title10	&titleformat "Supporting Doc Page: &supppage; Study Phase Page: &spsupppage";

		proc report data=final_2 headline headskip spacing=1 split='*' missing
			style(report)={just=center font_face=times   font_size=1 cellspacing=2 borderwidth=2 background=white}
			style(header)={vjust=top   font_face=verdana font_size=2 font_weight=bold cellheight = 22 background=#7c98B0 
				foreground = white htmlstyle="text-align:center"}
			style(column)={just=center font_face=calibri background=white htmlstyle="text-align:center"};
		column country sitenbr subjnbr start_point start_date wknbr formmnemonic formidx_m ident expfram criteria_val1 criteria_val2 criteria_val3 cut_form cut_seq cut_date dt_oedra dt_pms1a;
		define country			/ display   width=20 'Country'	flow;
		define sitenbr			/ display   width=10 'Site' style(column)={tagattr='format:@'};
		define subjnbr			/ display	width=15 'Subject Number' style(column)={tagattr='format:@'};
		define start_point		/ display   width=30 'Starting Point' flow;
		define start_date		/ display   width=15 'Starting Point Date' flow;
		define wknbr	        / display   width=15 'Week'	flow;
		define formmnemonic		/ display   width=20 'Form'	flow;
		define formidx_m		/ display   width=15 'Seq' flow;
		define ident		    / display   width=50 'Lesion Identification' flow;
		define expfram			/ display   width=50 'Expected Timeframe '	flow;
		define criteria_val1	/ display   width=50 'Criteria Value1'	flow;
		define criteria_val2	/ display   width=50 'Criteria Value2'	flow;
		define criteria_val3	/ display   width=50 'Criteria Value3'	flow;
		define cut_form		    / display   width=15 'Min cut off form'	flow;
		define cut_seq		    / display   width=10 'Min cut off seq'	flow;
		define cut_date		    / display   width=15 'Min cut off date'	flow;
		define dt_oedra		    / display   width=15 'OEDRA Date'	flow;
		define dt_pms1a		    / display   width=15 'PMS1A Date'	flow;
		run;			

	%end; /* End of &nobs > 0 */

	%if &supppage = Y %then %do;

		ods tagsets.excelxp  
			options ( embedded_titles        =  'yes'
					  embedded_footnotes     =  'yes'
					  print_footer           =  'Page &amp;P of &amp;N'
					  sheet_name             =  'onc_lsn_003_jr_std_supp_doc'
					  orientation            =  'landscape'
					  absolute_column_width  =  '10,10,20,10,10,20,10,10,20,10,10,15,50,50,10,15,20,25,15,15,15,15,15,15,10');
					  
		data onc_lsn_csv;
			%if &cnt_list eq 0 %then %do;
				if _n_ = 1 then output;
				set onc_lsn_csv;
				output;
			%end;
			%else %do;
				set onc_lsn_csv;
			output;
			%end;
		run;
		
		options formchar='|_' missing=' ' pageno=1 nobyline ls=160;
		title6	&titleformat "Lesion Evaluation Form: &lsnformdis";
		title7	&titleformat "Cut-off Exclude Form: &cutoff_excludeids";
		title8	&titleformat "# of rows for Supporting Doc: &cnt_list";
		title9	&titleformat "Supporting Doc Page: &supppage";
		title10	&titleformat "Study Phase Page: &spsupppage";

		proc report data=onc_lsn_csv headline headskip spacing=1 split='*' missing
			style(report)={just=center font_face=times   font_size=1 cellspacing=2 borderwidth=2 background=white}
			style(header)={vjust=top   font_face=verdana font_size=2 font_weight=bold cellheight = 22 background=#7c98B0 
				foreground = white htmlstyle="text-align:center"}
			style(column)={just=center font_face=calibri background=white htmlstyle="text-align:center"};
		column criteria_form1 criteria_item1 criteria_val1 criteria_form2 criteria_item2 criteria_val2 criteria_form3 criteria_item3 criteria_val3 tporder startflag lsn_frm pms1_seg pmsa_seg method_group method_ass low_day upper_day freq str_wk stp_wk treat_frm orad_frm surg_frm scenario;
		define criteria_form1	    / display 	width=10 'Criteria Form1' flow;
		define criteria_item1	    / display 	width=10 'Criteria Item1' flow;
		define criteria_val1	    / display 	width=20 'Criteria Value1' flow;
		define criteria_form2	    / display 	width=10 'Criteria Form2' flow;
		define criteria_item2	    / display 	width=10 'Criteria Item2' flow;
		define criteria_val2	    / display 	width=20 'Criteria Value2' flow;
		define criteria_form3	    / display 	width=10 'Criteria Form3' flow;
		define criteria_item3	    / display 	width=10 'Criteria Item3' flow;
		define criteria_val3	    / display 	width=20 'Criteria Value3' flow;
		define tporder				/ display   width=10 'Phase Order' flow;
		define startflag	        / display 	width=10 'Minimal start timepoint' flow;
		define lsn_frm       	    / display   width=15 'Lesion Evaluation Form';
		define pms1_seg          	/ display   width=50 'Trial Segment Reference' flow;
		define pmsa_seg	            / display 	width=50 'PMS1A Trial Segment Reference' flow;
		define method_group	        / display 	width=10 'Group for Method' flow;
		define method_ass	        / display 	width=15 'Method of Assessment' flow;
		define low_day	            / display 	width=20 'Lower window of days' flow;
		define upper_day	        / display 	width=25 'Upper window of days' flow;
		define freq	                / display 	width=15 'Frequency' flow;
		define str_wk	            / display 	width=15 'Start week' flow;
		define stp_wk	            / display 	width=15 'Stop week' flow;
		define treat_frm         	/ display 	width=15 'Oncologic Treatment' flow;
		define orad_frm         	/ display 	width=15 'Oncologic Radiation' flow;
		define surg_frm         	/ display 	width=15 'Oncologic Surgery' flow;
		define scenario         	/ display 	width=10 'Scenario' flow;

		run;		

	%end; /* End of &supppage = Y */

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

		title6	&titleformat "Lesion Evaluation Form: &lsnformdis";
		title7	&titleformat "Cut-off Exclude Form: &cutoff_excludeids";
		title8	&titleformat "# of rows for Supporting Doc: &cnt_list";
		title9	&titleformat "Supporting Doc Page: &supppage";
		title10	&titleformat "Study Phase Page: &spsupppage";

		proc report data=phase_csv headline headskip spacing=1 split='*' missing
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

%end; /* End of fileexist */

%let putfil=YES;
ods tagsets.excelxp close; 

%deletall;
run;
%mend onc_lsn_003_jr_std;
