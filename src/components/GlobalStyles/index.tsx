import './GlobalStyles.scss';

interface Props {
  children: JSX.Element;
}

function GlobalStyles(props: Props) {
  const { children } = props;
  return children;
}

export default GlobalStyles;
