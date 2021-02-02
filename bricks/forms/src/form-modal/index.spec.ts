import ReactDOM from "react-dom";

import "./";
import { FormModalElement } from "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("forms.form-modal", () => {
  it("should create a custom element", () => {
    const element = document.createElement(
      "forms.form-modal"
    ) as FormModalElement;
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();

    const spyOnDispatchEvent = jest.spyOn(element, "dispatchEvent");
    let formModalProps = ((spyOnRender.mock.calls[
      spyOnRender.mock.calls.length - 1
    ][0] as unknown) as React.ReactElement).props.children.props;
    expect(formModalProps.visible).toBe(false);
    element.open();
    formModalProps = ((spyOnRender.mock.calls[
      spyOnRender.mock.calls.length - 1
    ][0] as unknown) as React.ReactElement).props.children.props;
    expect(formModalProps.visible).toBe(true);
    expect(spyOnDispatchEvent).toBeCalledWith(
      expect.objectContaining({ type: "formModal.open" })
    );

    element.close();
    formModalProps = ((spyOnRender.mock.calls[
      spyOnRender.mock.calls.length - 1
    ][0] as unknown) as React.ReactElement).props.children.props;
    expect(formModalProps.visible).toBe(false);
    expect(spyOnDispatchEvent).toBeCalledWith(
      expect.objectContaining({ type: "formModal.close" })
    );

    const spyOnClose = jest.spyOn(element, "close");
    formModalProps = ((spyOnRender.mock.calls[
      spyOnRender.mock.calls.length - 1
    ][0] as unknown) as React.ReactElement).props.children.props;
    formModalProps.onOk();
    expect(spyOnDispatchEvent).toBeCalledWith(
      expect.objectContaining({ type: "formModal.ok" })
    );
    expect(spyOnClose).toBeCalledTimes(1);
    spyOnDispatchEvent.mockImplementationOnce((event) => false);
    formModalProps.onOk();
    expect(spyOnClose).toBeCalledTimes(1);

    formModalProps.onCancel();
    expect(spyOnDispatchEvent).toBeCalledWith(
      expect.objectContaining({ type: "formModal.cancel" })
    );
    expect(spyOnClose).toBeCalledTimes(2);
    spyOnDispatchEvent.mockImplementationOnce((event) => false);
    formModalProps.onCancel();
    expect(spyOnClose).toBeCalledTimes(2);

    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });
});
