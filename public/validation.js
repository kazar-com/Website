export const stages=['Brief','Design development','Tender / pricing','On site','Handover','Not sure'];
export const fields={'Name':['name',120],'Email':['email',254],'Project stage':['projectStage',60],'Project brief':['projectBrief',5000],'Company / role':['companyRole',200],'Preferred channel':['preferredChannel',20],'Phone':['phone',40]};
export const detailFields={'Project type':['projectType',80],'Location':['location',200],'Approximate size':['approximateSize',100],'Design status':['designStatus',80],'Architect / designer appointed?':['designerAppointed',40],'Target programme':['targetProgramme',200],'Budget range':['budgetRange',80],'Company / representation':['representation',200]};
export function validate(input,details=false){
 const errors={},data={};
 if(!input||typeof input!=='object'||Array.isArray(input))return {errors:{form:'Enter valid project information.'},data};
 for(const [label,[key,max]]of Object.entries(details?detailFields:fields)){
 const raw=input[key]??'';
 if(typeof raw!=='string'){errors[key]=`Enter a valid ${label.toLowerCase()}.`;continue}
 const value=raw.trim();data[key]=value;
 if(value.length>max)errors[key]=`${label} must be ${max} characters or fewer.`;
 }
 if(!details){
 for(const key of ['name','email','projectStage','projectBrief'])if(!data[key])errors[key]='This field is required.';
 if(data.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))errors.email='Enter a valid email address.';
 if(data.projectStage&&!stages.includes(data.projectStage))errors.projectStage='Choose a listed project stage.';
 if(data.preferredChannel&&!['Email','Phone'].includes(data.preferredChannel))errors.preferredChannel='Choose Email or Phone.';
 if(data.phone&&!/^[+()\d\s.-]{5,40}$/.test(data.phone))errors.phone='Enter a valid phone number or leave this optional field blank.';
 }
 return {data,errors};
}
