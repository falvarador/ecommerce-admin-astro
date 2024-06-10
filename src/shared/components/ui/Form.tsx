// import type { Actions } from "astro:actions";

// import { createStore } from "solid-js/store";
// import { Show, createSignal, type JSX } from "solid-js";

// export type FormBase = {
//   isSubmitting: boolean;
//   checkValidity: () => boolean;
//   reportValidity: () => boolean;
// };

// interface Props extends JSX.InputHTMLAttributes<HTMLInputElement> {
//   handleSubmit: (e: Event) => Promise<void>;
// }

// const [formBase, setFormBase] = createStore<FormBase>({} as FormBase);

// export function Form(props: Props) {
//   return (
//     <form
//       method="post"
//       class="mx-auto grid w-[350px] gap-6"
//       onSubmit={props.handleSubmit}
//       {...props}
//     />
//   );
// }
