function Button({ children, onClick, style, ...props }) {
  return (
    <button onClick={onClick} style={style} {...props}>
      {children}
    </button>
  );
}

export default Button;
