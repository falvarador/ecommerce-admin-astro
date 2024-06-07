import { Show, createSignal, type JSX } from "solid-js";

interface Props extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  validationChecks: string[];
  errorMessage: string;
}

export function TextField(props: Props) {
  const [isValid, setIsValid] = createSignal(true);

  const checkValidity = (e: Event) => {
    const { validity } = e.target as HTMLInputElement & {
      validity: { [key: string]: boolean };
    };
    const checksPassed =
      props.validationChecks.filter((check) => validity[check]).length === 0;
    setIsValid(checksPassed);
  };

  return (
    <>
      <label for={props.id}>{props.label}</label>
      <input
        id={props.id}
        {...props}
        class={"input input-bordered w-full"}
        onBlur={checkValidity}
      />
      <Show when={!isValid()}>
        <p class="text-error text-sm">{props.errorMessage}</p>
      </Show>
    </>
  );
}
