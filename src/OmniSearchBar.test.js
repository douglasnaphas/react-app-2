import React from "react";
import OmniSearchBar from "./OmniSearchBar";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("OmniSearch/OmniSearchPage", () => {
  let onSubmitFunc;

  beforeEach(() => {
    onSubmitFunc = jest.fn();
  });

  it("three characters are required to initiate search", () => {
    const component = shallow(<OmniSearchBar onSubmitSearch={onSubmitFunc} />);
    let input = component.find(".search-bar");

    expect(input.exists()).toEqual(true);
    expect(component).toMatchSnapshot();

    input.simulate("keypress", { keyCode: 13 });
    expect(onSubmitFunc).not.toHaveBeenCalled();

    input.prop("onChange")({ target: { value: "te" } });
    expect(component).toMatchSnapshot();
    // state has changed, so re-find the input
    input = component.find(".search-bar");
    input.simulate("keypress", { keyCode: 13 });
    expect(onSubmitFunc).not.toHaveBeenCalled();

    input.prop("onChange")({ target: { value: "test1234" } });
    // state changed again, so re-find the input again
    input = component.find(".search-bar");
    expect(component).toMatchSnapshot();
    input.simulate("keypress", { keyCode: 13 });
    expect(onSubmitFunc).toHaveBeenCalled();
  });
});
