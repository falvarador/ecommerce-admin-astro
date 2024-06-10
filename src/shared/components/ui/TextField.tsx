import { Show, createSignal, type JSX } from "solid-js";

type ValitionChecks = {
  error: string;
  validationType: keyof ValidityTypes;
};

type ValidityTypes = {
  patternMismatch: "patternMismatch";
  rangeOverflow: "rangeOverflow";
  rangeUnderflow: "rangeUnderflow";
  stepMismatch: "stepMismatch";
  tooLong: "tooLong";
  tooShort: "tooShort";
  typeMismatch: "typeMismatch";
  valueMissing: "valueMissing";
};

interface Props extends JSX.InputHTMLAttributes<HTMLInputElement> {
  error: string;
  isValid: boolean;
  label: string;
  validations?: ValitionChecks[];
}

export function TextField(props: Props) {
  const [error, setError] = createSignal(props.error);
  const [isValid, setIsValid] = createSignal(props.isValid);

  const checkValidity = (event: FocusEvent) => {
    const target = event.target as HTMLInputElement;

    props.validations
      ? props.validations.forEach((validation) => {
          if (target.validity[validation.validationType]) {
            setError(validation.error);
          } else {
            setError(target.validationMessage);
          }
        })
      : setError(target.validationMessage);

    setIsValid(target.checkValidity());
  };

  return (
    <>
      <label for={props.id} class={!isValid() ? "text-error" : ""}>
        {props.label}
      </label>
      <input
        aria-describedby={`${props.id}-error`}
        aria-errormessage=""
        aria-invalid={!isValid()}
        id={props.id}
        {...props}
        class={"input input-bordered w-full"}
        onBlur={checkValidity}
      />
      <Show when={!isValid()}>
        <p class="text-error text-sm">{error()}</p>
      </Show>
    </>
  );
}
