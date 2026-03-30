import{b as $,c as cA,W as _,a as D,X as pe,Y as Te,Z as ve,r as mA,j as oA}from"./index-Cri1stFi.js";import{A as he}from"./schema-FZyx7I32.js";const Ne=$.injectEndpoints({endpoints:h=>({savePatient:h.mutation({query:u=>({url:"/doctor/patient",method:"POST",body:u}),invalidatesTags:["DoctorPatientList","Bill","PrintBillByMonth"]}),updatePatient:h.mutation({query:u=>({url:`/doctor/patient/${u._id}`,method:"PUT",body:u}),invalidatesTags:["DoctorPatientList","Bill","PrintBillByMonth"]})})}),{useSavePatientMutation:Re,useUpdatePatientMutation:Ue}=Ne,be=$.injectEndpoints({endpoints:h=>({addNewImage:h.mutation({query:u=>({url:"/admin/patient/attachmentsave",method:"POST",body:u})})})}),{useAddNewImageMutation:He}=be,Je=cA({_id:D().required("ID is required"),attachment:_().of(D().url("Each attachment must be a valid URL")).min(1,"At least one attachment is required").required("Attachments are required"),small_url:_().of(D().url("Each attachment must be a valid URL")).min(1,"At least one attachment is required").required("Attachments are required")}),Qe=$.injectEndpoints({endpoints:h=>({getAdminPatientView:h.query({query:u=>({url:`/admin/patient/${u}`,method:"GET"}),providesTags:(u,O,L)=>[{type:"PendingPatient",id:L}]})})}),{useGetAdminPatientViewQuery:Fe}=Qe,We=cA({doctor_id:_().of(D()),ignore_dr:_().of(D())}),xe=$.injectEndpoints({endpoints:h=>({selectdDoctor:h.mutation({query:({id:u,data:O})=>({url:`/admin/patient/selectdoctor/${u}`,method:"PUT",body:O}),invalidatesTags:(u,O,{id:L})=>[{type:"PendingPatient",id:"LIST"},{type:"PendingPatient",id:L}]})})}),{useSelectdDoctorMutation:Ze}=xe,je=$.injectEndpoints({endpoints:h=>({adminUpdatePatient:h.mutation({query:({patient_id:u,data:O})=>({url:`/admin/patient/${u}`,method:"PUT",body:O}),invalidatesTags:["PendingPatient","Patient"]})})}),{useAdminUpdatePatientMutation:Xe}=je,qe=cA({attachment:_().of(D().url()).required().min(1),small_url:_().of(D().url()).required().min(1),history:D().optional().default(""),xray_name:D().optional().default(""),age:D().optional().default(""),patient_id:D().required("Patient ID is required"),name:D().required("Patient name is required"),rtype:D().required("Report type is required"),study_for:D().required("Study for is required")}),Ve=cA({name:D().required("User name is required"),details:D().required("Designation is required")}),Ke=cA({attachment:_().of(D().url()).required().min(1),small_url:_().of(D().url()).required().min(1),patient_id:D().required("Patient ID is required"),name:D().required("Patient name is required"),age:D().optional().default(""),gender:D().optional().default(""),history:D().optional().default(""),xray_name:D().optional().default(""),ref_doctor:D().optional().default(""),image_type:D().required("Image type is required")}),Ce=$.injectEndpoints({endpoints:h=>({createClonePatient:h.mutation({query:u=>({url:"/admin/patient",method:"POST",body:u})})})}),{useCreateClonePatientMutation:_e}=Ce,$e=cA({title:D().required("Format Title is required"),type:D().required("Type is required"),details:D().required("Details is required")}),Le=$.injectEndpoints({endpoints:h=>({addDoctorFormat:h.mutation({query:u=>({url:"/doctor/format",method:"POST",body:u}),invalidatesTags:[{type:"FormatList",id:"LIST"}]}),updateDoctorFormat:h.mutation({query:u=>({url:`/doctor/format/${u.id}`,method:"PUT",body:u}),invalidatesTags:(u,O,{id:L})=>[{type:"FormatList",id:"LIST"},{type:"Format",id:L}]}),deleteDoctorFormat:h.mutation({query:u=>({url:`/doctor/format/${u}`,method:"DELETE",body:{_id:u}}),invalidatesTags:(u,O,L)=>[{type:"FormatList",id:"LIST"},{type:"Format",id:L}]})})}),{useAddDoctorFormatMutation:At,useUpdateDoctorFormatMutation:et}=Le,ze=$.injectEndpoints({endpoints:h=>({getDoctorFormates:h.query({query:({page:u=1,limit:O=10,search:L=""})=>{const M=new URLSearchParams;return L&&M.append("search",L),M.append("page",u.toString()),M.append("limit",O.toString()),{url:`/doctor/format?${M.toString()}`,method:"GET"}},transformResponse:u=>he(u),providesTags:[{type:"FormatList",id:"LIST"}]}),getDoctorFormat:h.query({query:u=>({url:`/doctor/format/${u}`,method:"GET"}),transformResponse:u=>Array.isArray(u)?u[0]:Array.isArray(u.data)?u.data[0]:u.data,providesTags:(u,O,L)=>[{type:"Format",id:L}]})})}),{useGetDoctorFormatQuery:tt}=ze,nt=cA({name:D().required("Reference name is required")});var NA={exports:{}},Ye=NA.exports,ie;function ke(){return ie||(ie=1,(function(h,u){(function(O,L){h.exports=L(pe(),Te())})(Ye,(function(O,L){return(function(M){var N={};function l(e){if(N[e])return N[e].exports;var d=N[e]={i:e,l:!1,exports:{}};return M[e].call(d.exports,d,d.exports,l),d.l=!0,d.exports}return l.m=M,l.c=N,l.d=function(e,d,m){l.o(e,d)||Object.defineProperty(e,d,{enumerable:!0,get:m})},l.r=function(e){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,d){if(1&d&&(e=l(e)),8&d||4&d&&typeof e=="object"&&e&&e.__esModule)return e;var m=Object.create(null);if(l.r(m),Object.defineProperty(m,"default",{enumerable:!0,value:e}),2&d&&typeof e!="string")for(var i in e)l.d(m,i,(function(y){return e[y]}).bind(null,i));return m},l.n=function(e){var d=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(d,"a",d),d},l.o=function(e,d){return Object.prototype.hasOwnProperty.call(e,d)},l.p="",l(l.s=4)})([function(M,N){M.exports=O},function(M,N,l){var e;/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/(function(){var d={}.hasOwnProperty;function m(){for(var i=[],y=0;y<arguments.length;y++){var b=arguments[y];if(b){var P=typeof b;if(P==="string"||P==="number")i.push(b);else if(Array.isArray(b)&&b.length){var Y=m.apply(null,b);Y&&i.push(Y)}else if(P==="object")for(var k in b)d.call(b,k)&&b[k]&&i.push(k)}}return i.join(" ")}M.exports?(m.default=m,M.exports=m):(e=(function(){return m}).apply(N,[]))===void 0||(M.exports=e)})()},function(M,N){M.exports="data:application/vnd.ms-fontobject;base64,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"},function(M,N){M.exports=L},function(M,N,l){M.exports=l(13)},function(M,N,l){var e=l(6);typeof e=="string"&&(e=[[M.i,e,""]]);var d={insert:"head",singleton:!1};l(12)(e,d),e.locals&&(M.exports=e.locals)},function(M,N,l){N=M.exports=l(7)(!1);var e=l(8),d=e(l(2)),m=e(l(2)+"?#iefix"),i=e(l(9)),y=e(l(10)),b=e(l(11));N.push([M.i,`@font-face {
  font-family: 'icomoon';
  src: url(`+d+`);
  src: url(`+m+") format('embedded-opentype'), url("+i+") format('truetype'), url("+y+") format('woff'), url("+b+`) format('svg');
  font-weight: normal;
  font-style: normal;
}
.react-viewer {
  opacity: 0;
}
.react-viewer-inline {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 400px;
}
.react-viewer ul {
  margin: 0;
  padding: 0;
}
.react-viewer li {
  list-style: none;
}
.react-viewer-mask {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #373737;
  background-color: rgba(55, 55, 55, 0.6);
  height: 100%;
  filter: alpha(opacity=50);
  z-index: 1000;
}
.react-viewer-btn {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
}
.react-viewer-btn:hover {
  background-color: rgba(0, 0, 0, 0.8);
}
.react-viewer-close {
  position: fixed;
  top: 0px;
  right: 0px;
  overflow: hidden;
  width: 40px;
  height: 40px;
  border-radius: 0 0 0 40px;
  cursor: pointer;
  z-index: 1010;
}
.react-viewer-close > i {
  position: relative;
  top: 4px;
  left: 18px;
}
.react-viewer-canvas {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 1005;
}
.react-viewer-canvas > img {
  display: block;
  width: auto;
  height: auto;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}
.react-viewer-canvas > img.drag {
  cursor: move;
}
.react-viewer-footer {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  text-align: center;
  z-index: 1005;
}
.react-viewer-inline > .react-viewer-mask,
.react-viewer-inline > .react-viewer-close,
.react-viewer-inline > .react-viewer-canvas,
.react-viewer-inline > .react-viewer-footer {
  position: absolute;
}
.react-viewer-attribute {
  margin: 0 20px;
  margin-bottom: 6px;
  opacity: 0.8;
  color: #ccc;
  font-size: 15px;
}
.react-viewer-showTotal {
  float: right;
}
.react-viewer-toolbar {
  overflow: hidden;
  height: 28px;
  margin-bottom: 6px !important;
}
.react-viewer-toolbar li {
  display: inline-block;
  width: 28px;
  height: 28px;
  border-radius: 28px;
  margin-right: 3px;
  cursor: pointer;
  line-height: 28px;
}
.react-viewer-toolbar li:hover {
  background-color: rgba(0, 0, 0, 0.8);
}
.react-viewer li.empty {
  background-color: transparent;
  cursor: default;
}
.react-viewer-navbar {
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
}
.react-viewer-list {
  height: 50px;
  padding: 1px;
  text-align: left;
}
.react-viewer-list > li {
  display: inline-block;
  width: 30px;
  height: 50px;
  cursor: pointer;
  overflow: hidden;
  margin-right: 1px;
}
.react-viewer-list > li > img {
  width: 60px;
  height: 50px;
  margin-left: -15px;
  opacity: 0.5;
}
.react-viewer-list > li.active > img {
  opacity: 1;
}
.react-viewer-transition {
  -webkit-transition: opacity 0.3s ease-out;
  -o-transition: opacity 0.3s ease-out;
  transition: opacity 0.3s ease-out;
}
.react-viewer-image-transition {
  -webkit-transition-property: width, height, margin, -webkit-transform;
  transition-property: width, height, margin, -webkit-transform;
  -o-transition-property: width, height, margin, transform;
  transition-property: width, height, margin, transform;
  transition-property: width, height, margin, transform, -webkit-transform;
  -webkit-transition-duration: 0.3s;
       -o-transition-duration: 0.3s;
          transition-duration: 0.3s;
  -webkit-transition-timing-function: ease-out;
       -o-transition-timing-function: ease-out;
          transition-timing-function: ease-out;
}
.react-viewer-list-transition {
  -webkit-transition: margin 0.3s ease-out;
  -o-transition: margin 0.3s ease-out;
  transition: margin 0.3s ease-out;
}
.react-viewer-icon {
  font-family: 'icomoon' !important;
  display: inline-block;
  font-style: normal;
  vertical-align: baseline;
  text-align: center;
  text-transform: none;
  text-rendering: auto;
  line-height: 1;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  font-size: 13px;
}
.react-viewer-icon-zoomIn:before {
  content: '\\ea0a';
}
.react-viewer-icon-zoomOut:before {
  content: '\\ea0b';
}
.react-viewer-icon-prev:before {
  content: '\\ea38';
}
.react-viewer-icon-next:before {
  content: '\\ea34';
}
.react-viewer-icon-close:before {
  content: '\\ea0f';
}
.react-viewer-icon-rotateLeft:before {
  content: '\\e967';
}
.react-viewer-icon-rotateRight:before {
  content: '\\e968';
}
.react-viewer-icon-reset:before {
  content: '\\e984';
}
.react-viewer-icon-scaleX:before {
  content: '\\ea60';
}
.react-viewer-icon-scaleY:before {
  content: '\\ea5f';
}
.react-viewer-icon-download:before {
  content: '\\e9c7';
}
.circle-loading {
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  width: 80px;
  height: 80px;
  border-radius: 100%;
  border: 10px solid rgba(255, 255, 255, 0.2);
  border-top-color: #FFF;
  -webkit-animation: spin 1s infinite linear;
          animation: spin 1s infinite linear;
}
@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
`,""])},function(M,N,l){M.exports=function(e){var d=[];return d.toString=function(){return this.map((function(m){var i=(function(y,b){var P=y[1]||"",Y=y[3];if(!Y)return P;if(b&&typeof btoa=="function"){var k=(sA=Y,F=btoa(unescape(encodeURIComponent(JSON.stringify(sA)))),lA="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(F),"/*# ".concat(lA," */")),AA=Y.sources.map((function(eA){return"/*# sourceURL=".concat(Y.sourceRoot).concat(eA," */")}));return[P].concat(AA).concat([k]).join(`
`)}var sA,F,lA;return[P].join(`
`)})(m,e);return m[2]?"@media ".concat(m[2],"{").concat(i,"}"):i})).join("")},d.i=function(m,i){typeof m=="string"&&(m=[[null,m,""]]);for(var y={},b=0;b<this.length;b++){var P=this[b][0];P!=null&&(y[P]=!0)}for(var Y=0;Y<m.length;Y++){var k=m[Y];k[0]!=null&&y[k[0]]||(i&&!k[2]?k[2]=i:i&&(k[2]="(".concat(k[2],") and (").concat(i,")")),d.push(k))}},d}},function(M,N,l){M.exports=function(e,d){return typeof(e=e.__esModule?e.default:e)!="string"?e:(/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),/["'() \t\n]/.test(e)||d?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e)}},function(M,N){M.exports="data:font/ttf;base64,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"},function(M,N){M.exports="data:font/woff;base64,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"},function(M,N){M.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIiA+DQo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8bWV0YWRhdGE+R2VuZXJhdGVkIGJ5IEljb01vb248L21ldGFkYXRhPg0KPGRlZnM+DQo8Zm9udCBpZD0iaWNvbW9vbiIgaG9yaXotYWR2LXg9IjEwMjQiPg0KPGZvbnQtZmFjZSB1bml0cy1wZXItZW09IjEwMjQiIGFzY2VudD0iOTYwIiBkZXNjZW50PSItNjQiIC8+DQo8bWlzc2luZy1nbHlwaCBob3Jpei1hZHYteD0iMTAyNCIgLz4NCjxnbHlwaCB1bmljb2RlPSImI3gyMDsiIGhvcml6LWFkdi14PSI1MTIiIGQ9IiIgLz4NCjxnbHlwaCB1bmljb2RlPSImI3hlOTY3OyIgZ2x5cGgtbmFtZT0icm90YXRlLWxlZnQiIGQ9Ik03NjEuODYyLTY0YzExMy43MjYgMjA2LjAzMiAxMzIuODg4IDUyMC4zMDYtMzEzLjg2MiA1MDkuODI0di0yNTMuODI0bC0zODQgMzg0IDM4NCAzODR2LTI0OC4zNzJjNTM0Ljk2MiAxMy45NDIgNTk0LjU3LTQ3Mi4yMTQgMzEzLjg2Mi03NzUuNjI4eiIgLz4NCjxnbHlwaCB1bmljb2RlPSImI3hlOTY4OyIgZ2x5cGgtbmFtZT0icm90YXRlLXJpZ2h0IiBkPSJNNTc2IDcxMS42Mjh2MjQ4LjM3MmwzODQtMzg0LTM4NC0zODR2MjUzLjgyNGMtNDQ2Ljc1IDEwLjQ4Mi00MjcuNTg4LTMwMy43OTItMzEzLjg2LTUwOS44MjQtMjgwLjcxMiAzMDMuNDE0LTIyMS4xIDc4OS41NyAzMTMuODYgNzc1LjYyOHoiIC8+DQo8Z2x5cGggdW5pY29kZT0iJiN4ZTk4NDsiIGdseXBoLW5hbWU9InJlc2V0IiBkPSJNMTAyNCA1NzZoLTM4NGwxNDMuNTMgMTQzLjUzYy03Mi41MyA3Mi41MjYtMTY4Ljk2IDExMi40Ny0yNzEuNTMgMTEyLjQ3cy0xOTktMzkuOTQ0LTI3MS41My0xMTIuNDdjLTcyLjUyNi03Mi41My0xMTIuNDctMTY4Ljk2LTExMi40Ny0yNzEuNTNzMzkuOTQ0LTE5OSAxMTIuNDctMjcxLjUzYzcyLjUzLTcyLjUyNiAxNjguOTYtMTEyLjQ3IDI3MS41My0xMTIuNDdzMTk5IDM5Ljk0NCAyNzEuNTI4IDExMi40NzJjNi4wNTYgNi4wNTQgMTEuODYgMTIuMjkyIDE3LjQ1NiAxOC42NjhsOTYuMzItODQuMjgyYy05My44NDYtMTA3LjE2Ni0yMzEuNjY0LTE3NC44NTgtMzg1LjMwNC0xNzQuODU4LTI4Mi43NyAwLTUxMiAyMjkuMjMtNTEyIDUxMnMyMjkuMjMgNTEyIDUxMiA1MTJjMTQxLjM4NiAwIDI2OS4zNjgtNTcuMzI2IDM2Mi4wMTYtMTQ5Ljk4NGwxNDkuOTg0IDE0OS45ODR2LTM4NHoiIC8+DQo8Z2x5cGggdW5pY29kZT0iJiN4ZTljNzsiIGdseXBoLW5hbWU9ImRvd25sb2FkIiBkPSJNNzM2IDUxMmwtMjU2LTI1Ni0yNTYgMjU2aDE2MHYzODRoMTkydi0zODR6TTQ4MCAyNTZoLTQ4MHYtMjU2aDk2MHYyNTZoLTQ4MHpNODk2IDEyOGgtMTI4djY0aDEyOHYtNjR6IiAvPg0KPGdseXBoIHVuaWNvZGU9IiYjeGVhMGE7IiBnbHlwaC1uYW1lPSJ6b29tLWluIiBkPSJNOTkyIDU3NmgtMzUydjM1MmMwIDE3LjY3Mi0xNC4zMjggMzItMzIgMzJoLTE5MmMtMTcuNjcyIDAtMzItMTQuMzI4LTMyLTMydi0zNTJoLTM1MmMtMTcuNjcyIDAtMzItMTQuMzI4LTMyLTMydi0xOTJjMC0xNy42NzIgMTQuMzI4LTMyIDMyLTMyaDM1MnYtMzUyYzAtMTcuNjcyIDE0LjMyOC0zMiAzMi0zMmgxOTJjMTcuNjcyIDAgMzIgMTQuMzI4IDMyIDMydjM1MmgzNTJjMTcuNjcyIDAgMzIgMTQuMzI4IDMyIDMydjE5MmMwIDE3LjY3Mi0xNC4zMjggMzItMzIgMzJ6IiAvPg0KPGdseXBoIHVuaWNvZGU9IiYjeGVhMGI7IiBnbHlwaC1uYW1lPSJ6b29tLW91dCIgZD0iTTAgNTQ0di0xOTJjMC0xNy42NzIgMTQuMzI4LTMyIDMyLTMyaDk2MGMxNy42NzIgMCAzMiAxNC4zMjggMzIgMzJ2MTkyYzAgMTcuNjcyLTE0LjMyOCAzMi0zMiAzMmgtOTYwYy0xNy42NzIgMC0zMi0xNC4zMjgtMzItMzJ6IiAvPg0KPGdseXBoIHVuaWNvZGU9IiYjeGVhMGY7IiBnbHlwaC1uYW1lPSJjbG9zZSIgZD0iTTEwMTQuNjYyIDEzNy4zNGMtMC4wMDQgMC4wMDQtMC4wMDggMC4wMDgtMC4wMTIgMC4wMTBsLTMxMC42NDQgMzEwLjY1IDMxMC42NDQgMzEwLjY1YzAuMDA0IDAuMDA0IDAuMDA4IDAuMDA2IDAuMDEyIDAuMDEwIDMuMzQ0IDMuMzQ2IDUuNzYyIDcuMjU0IDcuMzEyIDExLjQxNiA0LjI0NiAxMS4zNzYgMS44MjQgMjQuNjgyLTcuMzI0IDMzLjgzbC0xNDYuNzQ2IDE0Ni43NDZjLTkuMTQ4IDkuMTQ2LTIyLjQ1IDExLjU2Ni0zMy44MjggNy4zMi00LjE2LTEuNTUtOC4wNzAtMy45NjgtMTEuNDE4LTcuMzEgMC0wLjAwNC0wLjAwNC0wLjAwNi0wLjAwOC0wLjAxMGwtMzEwLjY0OC0zMTAuNjUyLTMxMC42NDggMzEwLjY1Yy0wLjAwNCAwLjAwNC0wLjAwNiAwLjAwNi0wLjAxMCAwLjAxMC0zLjM0NiAzLjM0Mi03LjI1NCA1Ljc2LTExLjQxNCA3LjMxLTExLjM4IDQuMjQ4LTI0LjY4MiAxLjgyNi0zMy44My03LjMybC0xNDYuNzQ4LTE0Ni43NDhjLTkuMTQ4LTkuMTQ4LTExLjU2OC0yMi40NTItNy4zMjItMzMuODI4IDEuNTUyLTQuMTYgMy45Ny04LjA3MiA3LjMxMi0xMS40MTYgMC4wMDQtMC4wMDIgMC4wMDYtMC4wMDYgMC4wMTAtMC4wMTBsMzEwLjY1LTMxMC42NDgtMzEwLjY1LTMxMC42NTJjLTAuMDAyLTAuMDA0LTAuMDA2LTAuMDA2LTAuMDA4LTAuMDEwLTMuMzQyLTMuMzQ2LTUuNzYtNy4yNTQtNy4zMTQtMTEuNDE0LTQuMjQ4LTExLjM3Ni0xLjgyNi0yNC42ODIgNy4zMjItMzMuODNsMTQ2Ljc0OC0xNDYuNzQ2YzkuMTUtOS4xNDggMjIuNDUyLTExLjU2OCAzMy44My03LjMyMiA0LjE2IDEuNTUyIDguMDcwIDMuOTcgMTEuNDE2IDcuMzEyIDAuMDAyIDAuMDA0IDAuMDA2IDAuMDA2IDAuMDEwIDAuMDEwbDMxMC42NDggMzEwLjY1IDMxMC42NDgtMzEwLjY1YzAuMDA0LTAuMDAyIDAuMDA4LTAuMDA2IDAuMDEyLTAuMDA4IDMuMzQ4LTMuMzQ0IDcuMjU0LTUuNzYyIDExLjQxNC03LjMxNCAxMS4zNzgtNC4yNDYgMjQuNjg0LTEuODI2IDMzLjgyOCA3LjMyMmwxNDYuNzQ2IDE0Ni43NDhjOS4xNDggOS4xNDggMTEuNTcgMjIuNDU0IDcuMzI0IDMzLjgzLTEuNTUyIDQuMTYtMy45NyA4LjA2OC03LjMxNCAxMS40MTR6IiAvPg0KPGdseXBoIHVuaWNvZGU9IiYjeGVhMzQ7IiBnbHlwaC1uYW1lPSJuZXh0IiBkPSJNOTkyIDQ0OGwtNDgwIDQ4MHYtMjg4aC01MTJ2LTM4NGg1MTJ2LTI4OHoiIC8+DQo8Z2x5cGggdW5pY29kZT0iJiN4ZWEzODsiIGdseXBoLW5hbWU9InByZXYiIGQ9Ik0zMiA0NDhsNDgwLTQ4MHYyODhoNTEydjM4NGgtNTEydjI4OHoiIC8+DQo8Z2x5cGggdW5pY29kZT0iJiN4ZWE1ZjsiIGdseXBoLW5hbWU9InNjYWxlWSIgZD0iTTg5NiAxOTJoMTI4bC0xNjAtMTkyLTE2MCAxOTJoMTI4djUxMmgtMTI4bDE2MCAxOTIgMTYwLTE5MmgtMTI4ek02NDAgODk2di0yNTZsLTY0IDEyOGgtMTkydi03MDRoMTI4di02NGgtMzg0djY0aDEyOHY3MDRoLTE5MmwtNjQtMTI4djI1NnoiIC8+DQo8Z2x5cGggdW5pY29kZT0iJiN4ZWE2MDsiIGdseXBoLW5hbWU9InNjYWxlWCIgZD0iTTI1NiA2NHYtMTI4bC0xOTIgMTYwIDE5MiAxNjB2LTEyOGg1MTJ2MTI4bDE5Mi0xNjAtMTkyLTE2MHYxMjh6TTgzMiA4OTZ2LTI1NmwtNjQgMTI4aC0xOTJ2LTQ0OGgxMjh2LTY0aC0zODR2NjRoMTI4djQ0OGgtMTkybC02NC0xMjh2MjU2eiIgLz4NCjwvZm9udD48L2RlZnM+PC9zdmc+"},function(M,N,l){var e,d={},m=function(){return e===void 0&&(e=!!(window&&document&&document.all&&!window.atob)),e},i=(function(){var s={};return function(a){if(s[a]===void 0){var I=document.querySelector(a);if(window.HTMLIFrameElement&&I instanceof window.HTMLIFrameElement)try{I=I.contentDocument.head}catch{I=null}s[a]=I}return s[a]}})();function y(s,a){for(var I=[],o={},g=0;g<s.length;g++){var B=s[g],p=a.base?B[0]+a.base:B[0],A={css:B[1],media:B[2],sourceMap:B[3]};o[p]?o[p].parts.push(A):I.push(o[p]={id:p,parts:[A]})}return I}function b(s,a){for(var I=0;I<s.length;I++){var o=s[I],g=d[o.id],B=0;if(g){for(g.refs++;B<g.parts.length;B++)g.parts[B](o.parts[B]);for(;B<o.parts.length;B++)g.parts.push(eA(o.parts[B],a))}else{for(var p=[];B<o.parts.length;B++)p.push(eA(o.parts[B],a));d[o.id]={id:o.id,refs:1,parts:p}}}}function P(s){var a=document.createElement("style");if(s.attributes.nonce===void 0){var I=l.nc;I&&(s.attributes.nonce=I)}if(Object.keys(s.attributes).forEach((function(g){a.setAttribute(g,s.attributes[g])})),typeof s.insert=="function")s.insert(a);else{var o=i(s.insert||"head");if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(a)}return a}var Y,k=(Y=[],function(s,a){return Y[s]=a,Y.filter(Boolean).join(`
`)});function AA(s,a,I,o){var g=I?"":o.css;if(s.styleSheet)s.styleSheet.cssText=k(a,g);else{var B=document.createTextNode(g),p=s.childNodes;p[a]&&s.removeChild(p[a]),p.length?s.insertBefore(B,p[a]):s.appendChild(B)}}function sA(s,a,I){var o=I.css,g=I.media,B=I.sourceMap;if(g&&s.setAttribute("media",g),B&&btoa&&(o+=`
/*# sourceMappingURL=data:application/json;base64,`.concat(btoa(unescape(encodeURIComponent(JSON.stringify(B))))," */")),s.styleSheet)s.styleSheet.cssText=o;else{for(;s.firstChild;)s.removeChild(s.firstChild);s.appendChild(document.createTextNode(o))}}var F=null,lA=0;function eA(s,a){var I,o,g;if(a.singleton){var B=lA++;I=F||(F=P(a)),o=AA.bind(null,I,B,!1),g=AA.bind(null,I,B,!0)}else I=P(a),o=sA.bind(null,I,a),g=function(){(function(p){if(p.parentNode===null)return!1;p.parentNode.removeChild(p)})(I)};return o(s),function(p){if(p){if(p.css===s.css&&p.media===s.media&&p.sourceMap===s.sourceMap)return;o(s=p)}else g()}}M.exports=function(s,a){(a=a||{}).attributes=typeof a.attributes=="object"?a.attributes:{},a.singleton||typeof a.singleton=="boolean"||(a.singleton=m());var I=y(s,a);return b(I,a),function(o){for(var g=[],B=0;B<I.length;B++){var p=I[B],A=d[p.id];A&&(A.refs--,g.push(A))}o&&b(y(o,a),a);for(var w=0;w<g.length;w++){var r=g[w];if(r.refs===0){for(var c=0;c<r.parts.length;c++)r.parts[c]();delete d[r.id]}}}}},function(M,N,l){l.r(N);var e=l(0),d=l(3);l(5);function m(A){return e.createElement("div",{className:"loading-wrap",style:A.style},e.createElement("div",{className:"circle-loading"}))}var i,y=l(1),b=l.n(y);function P(A,w){return(function(r){if(Array.isArray(r))return r})(A)||(function(r,c){if(Symbol.iterator in Object(r)||Object.prototype.toString.call(r)==="[object Arguments]"){var E=[],T=!0,x=!1,Q=void 0;try{for(var R,G=r[Symbol.iterator]();!(T=(R=G.next()).done)&&(E.push(R.value),!c||E.length!==c);T=!0);}catch(H){x=!0,Q=H}finally{try{T||G.return==null||G.return()}finally{if(x)throw Q}}return E}})(A,w)||(function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")})()}function Y(A){var w=e.useRef(!1),r=e.useRef({x:0,y:0}),c=P(e.useState({x:0,y:0}),2),E=c[0],T=c[1];function x(j){A.onResize()}function Q(j){j.button===0&&A.visible&&A.drag&&(j.preventDefault(),j.stopPropagation(),w.current=!0,r.current={x:j.nativeEvent.clientX,y:j.nativeEvent.clientY})}e.useEffect((function(){return function(){V(!0),H(!0)}}),[]),e.useEffect((function(){return H(),function(){H(!0)}})),e.useEffect((function(){return A.visible&&A.drag&&V(),!A.visible&&A.drag&&G(),function(){V(!0)}}),[A.drag,A.visible]),e.useEffect((function(){var j=E.x-r.current.x,W=E.y-r.current.y;r.current={x:E.x,y:E.y},A.onChangeImgState(A.width,A.height,A.top+W,A.left+j)}),[E]);var R=function(j){w.current&&T({x:j.clientX,y:j.clientY})};function G(j){w.current=!1}function H(j){var W="addEventListener";j&&(W="removeEventListener"),window[W]("resize",x,!1)}function V(j){var W="addEventListener";j&&(W="removeEventListener"),document[W]("click",G,!1),document[W]("mousemove",R,!1)}var K,uA,gA,bA={width:"".concat(A.width,"px"),height:"".concat(A.height,"px"),transform:`
translateX(`.concat(A.left!==null?A.left+"px":"aoto",") translateY(").concat(A.top,`px)
    rotate(`).concat(A.rotate,"deg) scaleX(").concat(A.scaleX,") scaleY(").concat(A.scaleY,")")},BA=b()("".concat(A.prefixCls,"-image"),(K={drag:A.drag},uA="".concat(A.prefixCls,"-image-transition"),gA=!w.current,uA in K?Object.defineProperty(K,uA,{value:gA,enumerable:!0,configurable:!0,writable:!0}):K[uA]=gA,K)),QA={zIndex:A.zIndex},dA=null;return A.imgSrc!==""&&(dA=e.createElement("img",{className:BA,src:A.imgSrc,style:bA,onMouseDown:Q})),A.loading&&(dA=e.createElement("div",{style:{display:"flex",height:"".concat(window.innerHeight-84,"px"),justifyContent:"center",alignItems:"center"}},e.createElement(m,null))),e.createElement("div",{className:"".concat(A.prefixCls,"-canvas"),onMouseDown:function(j){A.onCanvasMouseDown(j),Q(j)},style:QA},dA)}function k(A){var w=A.activeIndex,r=w===void 0?0:w,c={marginLeft:"calc(50% - ".concat(r+1," * 31px)")};return e.createElement("div",{className:"".concat(A.prefixCls,"-navbar")},e.createElement("ul",{className:"".concat(A.prefixCls,"-list ").concat(A.prefixCls,"-list-transition"),style:c},A.images.map((function(E,T){return e.createElement("li",{key:T,className:T===r?"active":"",onClick:function(){var x;r!==(x=T)&&A.onChangeImg(x)}},e.createElement("img",{src:E.src,alt:E.alt}))}))))}function AA(A){return e.createElement("i",{className:"".concat("react-viewer-icon"," ").concat("react-viewer-icon","-").concat(i[A.type])})}(function(A){A[A.zoomIn=1]="zoomIn",A[A.zoomOut=2]="zoomOut",A[A.prev=3]="prev",A[A.next=4]="next",A[A.rotateLeft=5]="rotateLeft",A[A.rotateRight=6]="rotateRight",A[A.reset=7]="reset",A[A.close=8]="close",A[A.scaleX=9]="scaleX",A[A.scaleY=10]="scaleY",A[A.download=11]="download"})(i||(i={}));var sA=[{key:"zoomIn",actionType:i.zoomIn},{key:"zoomOut",actionType:i.zoomOut},{key:"prev",actionType:i.prev},{key:"reset",actionType:i.reset},{key:"next",actionType:i.next},{key:"rotateLeft",actionType:i.rotateLeft},{key:"rotateRight",actionType:i.rotateRight},{key:"scaleX",actionType:i.scaleX},{key:"scaleY",actionType:i.scaleY},{key:"download",actionType:i.download}];function F(A,w){return A.filter((function(r){return w.indexOf(r.key)<0}))}function lA(A){function w(E){var T=null;return i[E.actionType]!==void 0&&(T=e.createElement(AA,{type:E.actionType})),E.render&&(T=E.render),e.createElement("li",{key:E.key,className:"".concat(A.prefixCls,"-btn"),onClick:function(){(function(x){A.onAction(x)})(E)},"data-key":E.key},T)}var r=A.attribute?e.createElement("p",{className:"".concat(A.prefixCls,"-attribute")},A.alt&&"".concat(A.alt),A.noImgDetails||e.createElement("span",{className:"".concat(A.prefixCls,"-img-details")},"(".concat(A.width," x ").concat(A.height,")")),A.showTotal&&e.createElement("span",{className:"".concat(A.prefixCls,"-showTotal")},"".concat(A.activeIndex+1," of ").concat(A.count))):null,c=A.toolbars;return A.zoomable||(c=F(c,["zoomIn","zoomOut"])),A.changeable||(c=F(c,["prev","next"])),A.rotatable||(c=F(c,["rotateLeft","rotateRight"])),A.scalable||(c=F(c,["scaleX","scaleY"])),A.downloadable||(c=F(c,["download"])),e.createElement("div",null,r,e.createElement("ul",{className:"".concat(A.prefixCls,"-toolbar")},c.map((function(E){return w(E)}))))}function eA(A,w,r){return w in A?Object.defineProperty(A,w,{value:r,enumerable:!0,configurable:!0,writable:!0}):A[w]=r,A}function s(A,w){return(function(r){if(Array.isArray(r))return r})(A)||(function(r,c){if(Symbol.iterator in Object(r)||Object.prototype.toString.call(r)==="[object Arguments]"){var E=[],T=!0,x=!1,Q=void 0;try{for(var R,G=r[Symbol.iterator]();!(T=(R=G.next()).done)&&(E.push(R.value),!c||E.length!==c);T=!0);}catch(H){x=!0,Q=H}finally{try{T||G.return==null||G.return()}finally{if(x)throw Q}}return E}})(A,w)||(function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")})()}function a(){return(a=Object.assign||function(A){for(var w=1;w<arguments.length;w++){var r=arguments[w];for(var c in r)Object.prototype.hasOwnProperty.call(r,c)&&(A[c]=r[c])}return A}).apply(this,arguments)}function I(){}var o={setVisible:"setVisible",setActiveIndex:"setActiveIndex",update:"update",clear:"clear"};function g(A,w){return{type:A,payload:w||{}}}var B=function(A){var w,r=A.visible,c=r!==void 0&&r,E=A.onClose,T=E===void 0?I:E,x=A.images,Q=x===void 0?[]:x,R=A.activeIndex,G=R===void 0?0:R,H=A.zIndex,V=H===void 0?1e3:H,K=A.drag,uA=K===void 0||K,gA=A.attribute,bA=gA===void 0||gA,BA=A.zoomable,QA=BA===void 0||BA,dA=A.rotatable,j=dA===void 0||dA,W=A.scalable,re=W===void 0||W,OA=A.onMaskClick,ae=OA===void 0?I:OA,PA=A.changeable,oe=PA===void 0||PA,SA=A.customToolbar,ce=SA===void 0?function(t){return t}:SA,RA=A.zoomSpeed,xA=RA===void 0?.05:RA,UA=A.disableKeyboardSupport,se=UA!==void 0&&UA,HA=A.noResetZoomAfterChange,le=HA!==void 0&&HA,JA=A.noLimitInitializationSize,ue=JA!==void 0&&JA,FA=A.defaultScale,MA=FA===void 0?1:FA,WA=A.loop,ge=WA===void 0||WA,ZA=A.disableMouseZoom,de=ZA!==void 0&&ZA,XA=A.downloadable,Me=XA!==void 0&&XA,qA=A.noImgDetails,fe=qA!==void 0&&qA,VA=A.noToolbar,we=VA!==void 0&&VA,KA=A.showTotal,Ee=KA===void 0||KA,_A=A.minScale,DA=_A===void 0?.1:_A,Ie={visible:!1,visibleStart:!1,transitionEnd:!1,activeIndex:A.activeIndex,width:0,height:0,top:15,left:null,rotate:0,imageWidth:0,imageHeight:0,scaleX:MA,scaleY:MA,loading:!1,loadFailed:!1,startLoading:!1};function jA(){var t=window.innerWidth,f=window.innerHeight;return A.container&&(t=A.container.offsetWidth,f=A.container.offsetHeight),{width:t,height:f}}var J=e.useRef(jA()),yA=84,CA=e.useRef(null),wA=e.useRef(!1),$A=e.useRef(0),Ae=s(e.useReducer((function(t,f){switch(f.type){case o.setVisible:return a(a({},t),{visible:f.payload.visible});case o.setActiveIndex:return a(a({},t),{activeIndex:f.payload.index,startLoading:!0});case o.update:return a(a({},t),f.payload);case o.clear:return a(a({},t),{width:0,height:0,scaleX:MA,scaleY:MA,rotate:1,imageWidth:0,imageHeight:0,loadFailed:!1,top:0,left:0,loading:!1})}return t}),Ie),2),n=Ae[0],S=Ae[1];function LA(t){var f=arguments.length>1&&arguments[1]!==void 0&&arguments[1];S(g(o.update,{loading:!0,loadFailed:!1}));var v=null;Q.length>0&&(v=Q[t]);var C=!1,z=new Image;function U(TA,fA,EA){if(t===$A.current){var nA=TA,iA=fA;A.defaultSize&&(nA=A.defaultSize.width,iA=A.defaultSize.height),v.defaultSize&&(nA=v.defaultSize.width,iA=v.defaultSize.height);var X=s(ee(nA,iA),2),q=X[0],IA=X[1],vA=(J.current.width-q)/2,hA=(J.current.height-IA-yA)/2,rA=MA,aA=MA;le&&!f&&(rA=n.scaleX,aA=n.scaleY),S(g(o.update,{width:q,height:IA,left:vA,top:hA,imageWidth:TA,imageHeight:fA,loading:!1,rotate:0,scaleX:rA,scaleY:aA,loadFailed:!EA,startLoading:!1}))}}z.onload=function(){wA.current&&(C||U(z.width,z.height,!0))},z.onerror=function(){wA.current&&(A.defaultImg?(S(g(o.update,{loading:!1,loadFailed:!0,startLoading:!1})),U(A.defaultImg.width||.5*J.current.width,A.defaultImg.height||.5*J.current.height,!1)):S(g(o.update,{loading:!1,loadFailed:!1,startLoading:!1})))},z.src=v.src,z.complete&&(C=!0,U(z.width,z.height,!0))}function ee(t,f){var v=0,C=0,z=.8*J.current.width,U=.8*(J.current.height-yA);return(C=(v=Math.min(z,t))/t*f)>U&&(v=(C=U)/f*t),ue&&(v=t,C=f),[v,C]}function zA(t){if((ge||!(t>=Q.length||t<0))&&(t>=Q.length&&(t=0),t<0&&(t=Q.length-1),t!==n.activeIndex)){if(A.onChange){var f=pA(t);A.onChange(f,t)}S(g(o.setActiveIndex,{index:t}))}}function pA(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:void 0,f={src:"",alt:"",downloadUrl:""},v=null;return v=t!==void 0?t:n.activeIndex,Q.length>0&&v>=0&&(f=Q[v]),f}function te(){var t=arguments.length>0&&arguments[0]!==void 0&&arguments[0];S(g(o.update,{rotate:n.rotate+90*(t?1:-1)}))}function tA(t){switch(t){case i.prev:zA(n.activeIndex-1);break;case i.next:zA(n.activeIndex+1);break;case i.zoomIn:var f=YA();kA(f.x,f.y,1,xA);break;case i.zoomOut:var v=YA();kA(v.x,v.y,-1,xA);break;case i.rotateLeft:te();break;case i.rotateRight:te(!0);break;case i.reset:LA(n.activeIndex,!0);break;case i.scaleX:z=-1,S(g(o.update,{scaleX:n.scaleX*z}));break;case i.scaleY:(function(U){S(g(o.update,{scaleY:n.scaleY*U}))})(-1);break;case i.download:(C=pA()).downloadUrl&&(A.downloadInNewWindow?window.open(C.downloadUrl,"_blank"):location.href=C.downloadUrl)}var C,z}function ne(){var t="addEventListener";arguments.length>0&&arguments[0]!==void 0&&arguments[0]&&(t="removeEventListener"),se||document[t]("keydown",me,!0),CA.current&&CA.current[t]("wheel",Be,!1)}function me(t){var f=!1;switch(t.keyCode||t.which||t.charCode){case 27:T(),f=!0;break;case 37:t.ctrlKey?tA(i.rotateLeft):tA(i.prev),f=!0;break;case 39:t.ctrlKey?tA(i.rotateRight):tA(i.next),f=!0;break;case 38:tA(i.zoomIn),f=!0;break;case 40:tA(i.zoomOut),f=!0;break;case 49:t.ctrlKey&&(LA(n.activeIndex),f=!0)}f&&(t.preventDefault(),t.stopPropagation())}function Be(t){if(!de&&!n.loading){t.preventDefault();var f=0,v=t.deltaY;if((f=v===0?0:v>0?-1:1)!=0){var C=t.clientX,z=t.clientY;if(A.container){var U=A.container.getBoundingClientRect();C-=U.left,z-=U.top}kA(C,z,f,xA)}}}function YA(){return{x:n.left+n.width/2,y:n.top+n.height/2}}function kA(t,f,v,C){var z=YA(),U=t-z.x,TA=f-z.y,fA=0,EA=0,nA=0,iA=0,X=0,q=0;if(n.width===0){var IA=s(ee(n.imageWidth,n.imageHeight),2),vA=IA[0],hA=IA[1];EA=(J.current.width-vA)/2,fA=(J.current.height-yA-hA)/2,nA=n.width+vA,iA=n.height+hA,X=q=1}else{var rA=n.scaleX>0?1:-1,aA=n.scaleY>0?1:-1;X=n.scaleX+C*v*rA,q=n.scaleY+C*v*aA,A.maxScale!==void 0&&(Math.abs(X)>A.maxScale&&(X=A.maxScale*rA),Math.abs(q)>A.maxScale&&(q=A.maxScale*aA)),Math.abs(X)<DA&&(X=DA*rA),Math.abs(q)<DA&&(q=DA*aA),fA=n.top+-v*TA/n.scaleX*C*rA,EA=n.left+-v*U/n.scaleY*C*aA,nA=n.width,iA=n.height}S(g(o.update,{width:nA,scaleX:X,scaleY:q,height:iA,top:fA,left:EA,loading:!1}))}e.useEffect((function(){return wA.current=!0,function(){wA.current=!1}}),[]),e.useEffect((function(){J.current=jA()}),[A.container]),e.useEffect((function(){c&&wA.current&&S(g(o.setVisible,{visible:!0}))}),[c]),e.useEffect((function(){return ne(),function(){ne(!0)}})),e.useEffect((function(){return c?A.container||(document.body.style.overflow="hidden",document.body.scrollHeight>document.body.clientHeight&&(document.body.style.paddingRight="15px")):S(g(o.clear,{})),function(){document.body.style.overflow="",document.body.style.paddingRight=""}}),[n.visible]),e.useEffect((function(){c&&S(g(o.setActiveIndex,{index:G}))}),[G,c,Q]),e.useEffect((function(){n.startLoading&&($A.current=n.activeIndex,LA(n.activeIndex))}),[n.startLoading,n.activeIndex]);var Z="react-viewer",De=b()("".concat(Z),"".concat(Z,"-transition"),(eA(w={},"".concat(Z,"-inline"),A.container),eA(w,A.className,A.className),w)),ye={opacity:c&&n.visible?1:0,display:c||n.visible?"block":"none"},GA={src:"",alt:""};return c&&n.visible&&!n.loading&&n.activeIndex!==null&&!n.startLoading&&(GA=pA()),e.createElement("div",{className:De,style:ye,onTransitionEnd:function(){c||S(g(o.setVisible,{visible:!1}))},ref:CA},e.createElement("div",{className:"".concat(Z,"-mask"),style:{zIndex:V}}),A.noClose||e.createElement("div",{className:"".concat(Z,"-close ").concat(Z,"-btn"),onClick:function(){T()},style:{zIndex:V+10}},e.createElement(AA,{type:i.close})),e.createElement(Y,{prefixCls:Z,imgSrc:n.loadFailed&&A.defaultImg.src||GA.src,visible:c,width:n.width,height:n.height,top:n.top,left:n.left,rotate:n.rotate,onChangeImgState:function(t,f,v,C){S(g(o.update,{width:t,height:f,top:v,left:C}))},onResize:function(){if(J.current=jA(),c){var t=(J.current.width-n.width)/2,f=(J.current.height-n.height-yA)/2;S(g(o.update,{left:t,top:f}))}},zIndex:V+5,scaleX:n.scaleX,scaleY:n.scaleY,loading:n.loading,drag:uA,container:A.container,onCanvasMouseDown:function(t){ae(t)}}),A.noFooter||e.createElement("div",{className:"".concat(Z,"-footer"),style:{zIndex:V+5}},we||e.createElement(lA,{prefixCls:Z,onAction:function(t){if(tA(t.actionType),t.onClick){var f=pA();t.onClick(f)}},alt:GA.alt,width:n.imageWidth,height:n.imageHeight,attribute:bA,zoomable:QA,rotatable:j,scalable:re,changeable:oe,downloadable:Me,noImgDetails:fe,toolbars:ce(sA),activeIndex:n.activeIndex,count:Q.length,showTotal:Ee}),A.noNavbar||e.createElement(k,{prefixCls:Z,images:A.images,activeIndex:n.activeIndex,onChangeImg:zA})))};function p(A,w){return(function(r){if(Array.isArray(r))return r})(A)||(function(r,c){if(Symbol.iterator in Object(r)||Object.prototype.toString.call(r)==="[object Arguments]"){var E=[],T=!0,x=!1,Q=void 0;try{for(var R,G=r[Symbol.iterator]();!(T=(R=G.next()).done)&&(E.push(R.value),!c||E.length!==c);T=!0);}catch(H){x=!0,Q=H}finally{try{T||G.return==null||G.return()}finally{if(x)throw Q}}return E}})(A,w)||(function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")})()}N.default=function(A){var w=e.useRef(typeof document<"u"?document.createElement("div"):null),r=p(e.useState(A.container),2),c=r[0],E=r[1],T=p(e.useState(!1),2),x=T[0],Q=T[1];return e.useEffect((function(){document.body.appendChild(w.current)}),[]),e.useEffect((function(){A.visible&&!x&&Q(!0)}),[A.visible,x]),e.useEffect((function(){A.container?E(A.container):E(w.current)}),[A.container]),x?d.createPortal(e.createElement(B,A),c):null}}])}))})(NA)),NA.exports}var Ge=ke();const Oe=ve(Ge);mA.forwardRef(({attachments:h},u)=>{const[O,L]=mA.useState(!1),[M,N]=mA.useState(0),l=mA.useMemo(()=>h?.map(y=>({src:y.original_url}))??[],[h]),e=mA.useMemo(()=>h?.map(y=>({patient_id:y.patient_id,image:y.small_url}))??[],[h]),d=i=>{N(i),L(!0)};let m;return e&&e.length>0&&(m=e.map((i,y)=>oA.jsx("div",{className:"w-[100px] h-[100px] border rounded-md border-gray-300 overflow-hidden",children:oA.jsx("img",{src:i.image,alt:`Patient X-Ray ${y+1}`,className:"object-cover w-full h-full cursor-pointer",onClick:()=>d(y),loading:"lazy"})},y))),oA.jsxs("div",{className:"p-4",children:[oA.jsx("h2",{className:"text-xl font-semibold mb-4",children:"X-Ray Images"}),oA.jsx("div",{ref:u,className:"flex gap-4 flex-wrap",children:m}),oA.jsx("div",{className:"hidden min-[1024px]:block",children:oA.jsx(Oe,{visible:O,onClose:()=>L(!1),images:l,activeIndex:M,drag:!0,zoomable:!0,rotatable:!0,scalable:!0,noImgDetails:!0})})]})});export{Je as A,Ve as C,We as D,$e as F,nt as R,Ue as a,At as b,et as c,tt as d,He as e,Xe as f,qe as g,_e as h,Ke as i,Fe as j,Ze as k,Re as u};
