// src/components/ui/Input.jsx - VERSIÓN FINAL

function Input(props) {
  // Desestructuramos 'type' para darle un valor por defecto si no se proporciona.
  // El resto de las propiedades (name, value, onChange, onBlur, etc.)
  // se guardan en el objeto 'props'.
  const { type = "text", ...rest } = props; 

  return (
    <input 
      type={type} 
      // 🔑 CLAVE: Usamos el operador spread para pasar TODAS las props restantes
      // (incluyendo name, value, onChange, placeholder, className, etc.)
      {...rest}
    />
  );
}

export default Input;