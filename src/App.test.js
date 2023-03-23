import { shallow } from "enzyme";
import styled from "@emotion/styled";

test("it does not break on self enclosed styled components", () => {
  const Styled = styled.div`
    background-color: grey;
  `;

  expect(
    shallow(
      <div>
        <Styled>Doesn't break here</Styled>
      </div>
    )
  ).toMatchSnapshot();
});

test("it breaks on self enclosed styled components", () => {
  const SelfEnclosed = styled.div`
    background-color: grey;
  `;

  expect(
    shallow(
      <div>
        <SelfEnclosed />
      </div>
    )
  ).toMatchSnapshot();
});

test("it breaks on HOC with children function call", () => {
  expect(shallow(<div>{() => <div>Some content</div>}</div>)).toMatchSnapshot();
});

test("it breaks on dive calls on styled component", () => {
  function Button({ children, ...props }) {
    return <button {...props}>{children}</button>;
  }

  const StyledButton = styled(Button)`
    background-color: grey;
  `;

  const wrapper = shallow(<StyledButton>Click me</StyledButton>);
  expect(wrapper.dive()).toMatchSnapshot();
});
