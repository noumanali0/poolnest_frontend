// import React from "react";
// import { Input, Checkbox } from "antd";
// import "bootstrap/dist/css/bootstrap.min.css";

// const InvoiceEmail = () => {
//   // 1) Header (Title + Preview Email)
//   const EmailSettingsHeader = () => {
//     return (
//       <div className="row mb-3">
//         <div className="col">
//           <h4>Email Settings:</h4>
//         </div>
//         {/* "Preview Email" on the right */}
//         <div className="col text-end align-self-center">
//           <button className="bluebtn">Preview Email</button>
//         </div>
//       </div>
//     );
//   };

//   // 2) Sender Section
//   const SenderSection = () => {
//     return (
//       <div
//         className="mb-3"
//         style={{
//           gap: "5px",
//           backgroundColor: "white",
//           borderRadius: "12px",
//           marginTop: "12px",
//           padding: "10px",
//         }}
//       >
//         <h6>Sender:</h6>
//         <div className="p-3">
//           <div className="row mb-2">
//             <div className="col-sm-2">Name:</div>
//             <div className="col-sm-4">
//               <Input />
//             </div>
//             <div className="col-sm-2">Email:</div>
//             <div className="col-sm-4">
//               <Input />
//             </div>
//           </div>
//           <div className="row mb-2">
//             <div className="col-sm-2">From:</div>
//             <div className="col-sm-4">
//               <Input />
//             </div>
//             <div className="col-sm-2">CC:</div>
//             <div className="col-sm-4">
//               <Input />
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-sm-2">BCC:</div>
//             <div className="col-sm-4">
//               <Input />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // 3) Company Info Section
//   const CompanyInfoSection = () => {
//     return (
//       <div
//         className="mb-3"
//         style={{
//           gap: "5px",
//           backgroundColor: "white",
//           borderRadius: "12px",
//           marginTop: "12px",
//           padding: "10px",
//         }}
//       >
//         <h6>Company Info:</h6>
//         <div className="p-3">
//           {/* Row 1: Company Name + Phone */}
//           <div className="row mb-2">
//             <div className="col-sm-6">
//               <strong>Company Name:</strong> XYZ Pool Service
//             </div>
//             <div className="col-sm-6">
//               <strong>Phone Number:</strong> 623-999-9999
//             </div>
//           </div>
//           {/* Row 2: Billing Address + Email/Website */}
//           <div className="row mb-2">
//             <div className="col-sm-6">
//               <strong>Billing Address:</strong>
//               <br />
//               123 Main St.
//               <br />
//               Phoenix, AZ 85014
//             </div>
//             <div className="col-sm-6">
//               <strong>Email:</strong> email@email.com
//               <br />
//               <strong>Website:</strong> www.poolco.com
//             </div>
//           </div>
//           {/* Checkbox: Include Company Logo */}
//           <div className="row">
//             <div className="col">
//               <Checkbox>Include Company Logo</Checkbox>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // 4) Email Template Settings Section
//   const EmailTemplateSettings = () => {
//     return (
//       <div
//         className="mb-3"
//         style={{
//           gap: "5px",
//           backgroundColor: "white",
//           borderRadius: "12px",
//           marginTop: "12px",
//           padding: "10px",
//         }}
//       >
//         <h6>Email Template Settings</h6>
//         <div className="p-3">
//           <div className="row mb-2">
//             <div className="col-sm-3">Subject Line:</div>
//             <div className="col-sm-9">
//               <Input />
//             </div>
//           </div>
//           <div className="row mb-2">
//             <div className="col-sm-3">Header:</div>
//             <div className="col-sm-9">
//               <Input />
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-sm-3">Email Message:</div>
//             <div className="col-sm-9">
//               <Input.TextArea rows={4} />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // 5) Overdue Reminder Settings Section
//   const OverdueReminderSettings = () => {
//     return (
//       <div
//         className="mb-3"
//         style={{
//           gap: "5px",
//           backgroundColor: "white",
//           borderRadius: "12px",
//           marginTop: "12px",
//           padding: "10px",
//         }}
//       >
//         <h6>Overdue Reminder Settings:</h6>
//         <div className="p-3">
//           <div className="mb-3">
//             <Checkbox>
//               Set the number of days before the invoice is due:
//             </Checkbox>
//             <div className="d-flex align-items-center mt-2">
//               <Input style={{ width: "60px", marginRight: "8px" }} />
//               <span>Day(s)</span>
//             </div>
//           </div>
//           <div className="mb-3">
//             <Checkbox>
//               Set the number of days after the invoice is due:
//             </Checkbox>
//             <div className="d-flex align-items-center mt-2">
//               <Input style={{ width: "60px", marginRight: "8px" }} />
//               <span>Day(s)</span>
//             </div>
//           </div>
//           <div className="mb-3">
//             <Checkbox>
//               Set the interval for sending reminder emails until the invoice is
//               paid:
//             </Checkbox>
//             <div className="d-flex align-items-center mt-2">
//               <Input style={{ width: "60px", marginRight: "8px" }} />
//               <span>Day(s)</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // 6) Default Attachments Section
//   const DefaultAttachments = () => {
//     return (
//       <div
//         className="mb-3"
//         style={{
//           gap: "5px",
//           backgroundColor: "white",
//           borderRadius: "12px",
//           marginTop: "12px",
//           padding: "10px",
//         }}
//       >
//         <h6>Default Attachments:</h6>
//         <div className="row mb-2">
//           <div className="col-auto">
//             <Checkbox defaultChecked />
//           </div>
//           <div className="col">Include a PDF copy of the invoice</div>
//         </div>
//         <div className="row">
//           <div className="col-auto">
//             <Checkbox />
//           </div>
//           <div className="col d-flex align-items-center">
//             Additional Attachments
//             <i className="ms-2 bi bi-paperclip" />
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // 7) Footer Buttons (Cancel / Save)
//   const ActionButtons = () => {
//     return (
//       <div className="pt-2 d-flex justify-content-end" style={{ gap: "15px" }}>
//         <button
//           // onClick={handleCancel}
//           className="esimate-build-form-cancelbtn"
//         >
//           Cancel
//         </button>
//         <button
//           // onClick={handleSave}
//           className="esimate-build-form-savebtn"
//         >
//           Save
//         </button>
//       </div>
//     );
//   };

//   // The single component's main return
//   return (
//     <div className=" my-4">
//       <EmailSettingsHeader />

//       {/* Row 1: Sender (8 columns) + Company Info (4 columns) */}
//       <div className="row ">
//         <div className="col-md-8">
//           <SenderSection />
//         </div>
//         <div className="col-md-4">
//           <CompanyInfoSection />
//         </div>
//       </div>

//       {/* Row 2: Email Template (8 columns) + Overdue Reminder (4 columns) */}
//       <div className="row ">
//         <div className="col-md-8">
//           <EmailTemplateSettings />
//         </div>
//         <div className="col-md-4">
//           <OverdueReminderSettings />
//         </div>
//       </div>

//       {/* Default Attachments (full width) */}
//       <div className="row">
//         <div className="col-md-8">
//           <DefaultAttachments />
//         </div>
//       </div>

//       {/* Bottom Action Buttons */}
//       <ActionButtons />
//     </div>
//   );
// };

// export default InvoiceEmail;

import React from "react";
import { Input, Checkbox } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";

const InvoiceEmail = () => {
  // 1) Header (Title + Preview Email)
  const EmailSettingsHeader = () => {
    return (
      <div className="row mb-3">
        <div className="col">
          <h4>Email Settings:</h4>
        </div>
        {/* "Preview Email" on the right */}
        <div className="col text-end align-self-center">
          <button className="bluebtn">Preview Email</button>
        </div>
      </div>
    );
  };

  // 2) Sender Section
  const SenderSection = () => {
    return (
      <div
        className="mb-3"
        style={{
          gap: "5px",
          backgroundColor: "white",
          borderRadius: "12px",
          marginTop: "12px",
          padding: "10px",
        }}
      >
        <h6>Sender:</h6>
        <div className="p-3">
          <div className="row mb-2">
            <div className="col-sm-2">Name:</div>
            <div className="col-sm-4">
              <Input />
            </div>
            <div className="col-sm-2">Email:</div>
            <div className="col-sm-4">
              <Input />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-2">From:</div>
            <div className="col-sm-4">
              <Input />
            </div>
            <div className="col-sm-2">CC:</div>
            <div className="col-sm-4">
              <Input />
            </div>
          </div>
          {/* Aligned BCC row with 4 columns to match the rows above */}
          <div className="row">
            <div className="col-sm-2">BCC:</div>
            <div className="col-sm-4">
              <Input />
            </div>
            <div className="col-sm-2"></div>
            <div className="col-sm-4"></div>
          </div>
        </div>
      </div>
    );
  };

  // 3) Company Info Section
  const CompanyInfoSection = () => {
    return (
      <div
        className="mb-3"
        style={{
          gap: "5px",
          backgroundColor: "white",
          borderRadius: "12px",
          marginTop: "12px",
          padding: "10px",
        }}
      >
        <h6>Company Info:</h6>
        <div className="p-3">
          {/* Row 1: Company Name + Phone */}
          <div className="row mb-2">
            <div className="col-sm-6">
              <strong>Company Name:</strong> XYZ Pool Service
            </div>
            <div className="col-sm-6">
              <strong>Phone Number:</strong> 623-999-9999
            </div>
          </div>
          {/* Row 2: Billing Address + Email/Website */}
          <div className="row mb-2">
            <div className="col-sm-6">
              <strong>Billing Address:</strong>
              <br />
              123 Main St.
              <br />
              Phoenix, AZ 85014
            </div>
            <div className="col-sm-6">
              <strong>Email:</strong> email@email.com
              <br />
              <strong>Website:</strong> www.poolco.com
            </div>
          </div>
          {/* Checkbox: Include Company Logo */}
          <div className="row">
            <div className="col">
              <Checkbox>Include Company Logo</Checkbox>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 4) Email Template Settings Section
  const EmailTemplateSettings = () => {
    return (
      <div
        className="mb-3"
        style={{
          gap: "5px",
          backgroundColor: "white",
          borderRadius: "12px",
          marginTop: "12px",
          padding: "10px",
        }}
      >
        <h6>Email Template Settings</h6>
        <div className="p-3">
          <div className="row mb-2">
            <div className="col-sm-3">Subject Line:</div>
            <div className="col-sm-9">
              <Input />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-3">Header:</div>
            <div className="col-sm-9">
              <Input />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3">Email Message:</div>
            <div className="col-sm-9">
              <Input.TextArea rows={4} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 5) Overdue Reminder Settings Section
  const OverdueReminderSettings = () => {
    return (
      <div
        className="mb-3"
        style={{
          gap: "5px",
          backgroundColor: "white",
          borderRadius: "12px",
          marginTop: "12px",
          padding: "10px",
        }}
      >
        <h6>Overdue Reminder Settings:</h6>
        <div className="p-3">
          <div className="mb-3">
            <Checkbox>
              Set the number of days before the invoice is due:
            </Checkbox>
            <div className="d-flex align-items-center mt-2">
              <Input style={{ width: "60px", marginRight: "8px" }} />
              <span>Day(s)</span>
            </div>
          </div>
          <div className="mb-3">
            <Checkbox>
              Set the number of days after the invoice is due:
            </Checkbox>
            <div className="d-flex align-items-center mt-2">
              <Input style={{ width: "60px", marginRight: "8px" }} />
              <span>Day(s)</span>
            </div>
          </div>
          <div className="mb-3">
            <Checkbox>
              Set the interval for sending reminder emails until the invoice is
              paid:
            </Checkbox>
            <div className="d-flex align-items-center mt-2">
              <Input style={{ width: "60px", marginRight: "8px" }} />
              <span>Day(s)</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 6) Default Attachments Section
  const DefaultAttachments = () => {
    return (
      <div
        className="mb-3"
        style={{
          gap: "5px",
          backgroundColor: "white",
          borderRadius: "12px",
          marginTop: "12px",
          padding: "10px",
        }}
      >
        <h6>Default Attachments:</h6>
        <div className="row mb-2">
          <div className="col-auto">
            <Checkbox defaultChecked />
          </div>
          <div className="col">Include a PDF copy of the invoice</div>
        </div>
        <div className="row">
          <div className="col-auto">
            <Checkbox />
          </div>
          <div className="col d-flex align-items-center">
            Additional Attachments
            <i className="ms-2 bi bi-paperclip" />
          </div>
        </div>
      </div>
    );
  };

  // 7) Footer Buttons (Cancel / Save)
  const ActionButtons = () => {
    return (
      <div className="pt-2 d-flex justify-content-end" style={{ gap: "15px" }}>
        <button className="esimate-build-form-cancelbtn">Cancel</button>
        <button className="esimate-build-form-savebtn">Save</button>
      </div>
    );
  };

  // The single component's main return
  return (
    <div className=" my-4">
      <EmailSettingsHeader />

      {/* Row 1: Sender (8 columns) + Company Info (4 columns) */}
      <div className="row ">
        <div className="col-md-8">
          <SenderSection />
        </div>
        <div className="col-md-4">
          <CompanyInfoSection />
        </div>
      </div>

      {/* Row 2: Email Template (8 columns) + Overdue Reminder (4 columns) */}
      <div className="row ">
        <div className="col-md-8">
          <EmailTemplateSettings />
        </div>
        <div className="col-md-4">
          <OverdueReminderSettings />
        </div>
      </div>

      {/* Default Attachments (full width) */}
      <div className="row">
        <div className="col-md-8">
          <DefaultAttachments />
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <ActionButtons />
    </div>
  );
};

export default InvoiceEmail;
