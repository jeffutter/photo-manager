let styles: Js.t 'a = [%bs.raw "require('./components/full_page_spinner/style.scss')"];

let component = ReasonReact.statelessComponent "FullPageSpinner";

let make _children => {
  ...component,
  render: fun _self =>
    <div className=styles##container>
      <div className=styles##spinner>
        <div className=styles##bounce1 />
        <div className=styles##bounce2 />
        <div />
      </div>
    </div>
};

let default = ReasonReact.wrapReasonForJs ::component (fun _ => make [||]);
