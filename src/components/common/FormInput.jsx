import React, { useState } from "react";
import styled from "styled-components";

// Container per il campo di input
const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

// Stile base per l'input
const StyledInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid
    ${({ theme, hasError, isFocused }) =>
      hasError ? theme.error : isFocused ? theme.primary : "#ddd"};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: all 0.3s ease;
  background-color: ${({ hasError }) =>
    hasError ? "rgba(220, 53, 69, 0.05)" : "white"};

  &:focus {
    outline: none;
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.error : theme.primary};
    box-shadow: 0 0 0 3px
      ${({ theme, hasError }) =>
        hasError ? `${theme.error}30` : `${theme.primary}30`};
  }

  /* Rimuovere le frecce per input number */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

// Icona nel campo di input (es. per errore o successo)
const InputIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme, isError }) => (isError ? theme.error : theme.primary)};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

// Messaggio di errore sotto l'input
const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.error};
  font-size: 0.8rem;
  margin-top: 0.3rem;
  min-height: 1rem;
`;

/**
 * Componente FormInput migliorato con validazione e feedback visivo
 * @param {Object} props - Proprietà del componente
 * @param {string} props.type - Tipo di input (text, number, email, tel, ecc.)
 * @param {string} props.id - ID dell'input
 * @param {string} props.name - Nome dell'input
 * @param {string} props.value - Valore dell'input
 * @param {function} props.onChange - Handler per il cambio di valore
 * @param {string} props.placeholder - Testo placeholder
 * @param {boolean} props.required - Se l'input è obbligatorio
 * @param {string} props.validationType - Tipo di validazione (number, text, email, etc)
 * @param {boolean} props.disabled - Se l'input è disabilitato
 * @param {number} props.min - Valore minimo (per numeri)
 * @param {number} props.max - Valore massimo (per numeri)
 * @param {React.ReactNode} props.icon - Icona da mostrare nell'input
 */
const FormInput = ({
  type = "text",
  id,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  validationType,
  disabled = false,
  min,
  max,
  icon,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState("");

  // Gestisce l'inserimento nel campo e la validazione in tempo reale
  const handleChange = (e) => {
    const newValue = e.target.value;

    // Reset errore quando l'utente modifica il valore
    setError("");

    // Validazione in base al tipo
    if (validationType === "number") {
      // Consente solo numeri, punto e virgola
      if (newValue !== "" && !/^-?\d*[.,]?\d*$/.test(newValue)) {
        setError("Inserire solo valori numerici");
        return;
      }

      // Se il valore è vuoto o valido, elabora il valore
      const processedValue = newValue.replace(",", ".");
      const numValue = processedValue === "" ? "" : parseFloat(processedValue);

      // Controllo min/max per i numeri
      if (min !== undefined && numValue !== "" && numValue < min) {
        setError(`Il valore minimo è ${min}`);
      } else if (max !== undefined && numValue !== "" && numValue > max) {
        setError(`Il valore massimo è ${max}`);
      }

      // Aggiorna il valore nell'input e nel componente parent
      onChange({
        ...e,
        target: {
          ...e.target,
          name: e.target.name,
          value: processedValue,
        },
      });
    } else if (validationType === "text") {
      // Per campi di testo, vietare l'inserimento di numeri se necessario
      if (/^\d+$/.test(newValue)) {
        setError("In questo campo non sono ammessi solo numeri");
      }
      onChange(e);
    } else if (validationType === "email") {
      // Validazione email basilare
      if (newValue !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newValue)) {
        setError("Inserire un indirizzo email valido");
      }
      onChange(e);
    } else if (validationType === "tel") {
      // Validazione per numeri di telefono
      if (newValue !== "" && !/^[+]?\d*$/.test(newValue)) {
        setError("Inserire un numero di telefono valido");
      }
      onChange(e);
    } else {
      // Per tutti gli altri tipi, passa semplicemente il valore
      onChange(e);
    }
  };

  // Gestione focus
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);

    // Validazione al blur per campi obbligatori
    if (required && (!value || value === "")) {
      setError("Questo campo è obbligatorio");
    }
  };

  // Determina il tipo di input da usare
  let inputType = type;
  if (validationType === "number") {
    // Usiamo type="text" ma con validazione numerica per evitare le frecce
    inputType = "text";
  }

  return (
    <div>
      <InputContainer>
        <StyledInput
          type={inputType}
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          hasError={!!error}
          isFocused={isFocused}
          {...props}
        />
        {icon && (
          <InputIcon visible={true} isError={!!error}>
            {icon}
          </InputIcon>
        )}
      </InputContainer>
      <ErrorMessage>{error}</ErrorMessage>
    </div>
  );
};

export default FormInput;
