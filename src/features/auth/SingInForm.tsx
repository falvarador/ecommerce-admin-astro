import { actions, getActionProps, isInputError } from "astro:actions";

import { createForm } from "@tanstack/solid-form";

import { TextField } from "@/shared/components/ui/TextField";

export function SingInForm() {
  const form = createForm(() => ({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);

      const formData = new FormData();
      formData.append("email", value.email);
      formData.append("password", value.password);

      const { data, error } = await actions.singIn.safe(formData);

      if (error && isInputError(error)) {
        // fieldErrors = error.fields;
        console.log(error.fields);
      }
    },
  }));

  const handleBlur = (event: FocusEvent) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const name = target.name;

    if (value === "") return;

    console.log(value, name);
    target.setCustomValidity("Please enter your email.");
    // validate(singInForm, name as keyof SingInForm);
  };

  return (
    <form
      method="post"
      class="mx-auto grid w-[350px] gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <input {...getActionProps(actions.singIn)} />
      <fieldset class="grid gap-2 text-center">
        <h1 class="text-3xl font-bold">Login</h1>
        <p class="text-balance text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </fieldset>
      <div class="grid gap-4">
        <fieldset class="grid gap-2">
          <label for="email">Email</label>
          <form.Field
            name="email"
            children={(field) => (
              <input
                autocomplete="off"
                class="input input-bordered w-full"
                id="email"
                name={field().name}
                onBlur={field().handleBlur}
                onInput={(e) => field().handleChange(e.target.value)}
                placeholder="m@example.com"
                required
                type="email"
                value={field().state.value}
              />
            )}
          />
        </fieldset>
        <fieldset class="grid gap-2">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="*********"
            class="input input-bordered w-full"
            required
            onBlur={handleBlur}
          />
          {/* {fieldError.password && (
          <p class="text-error text-sm">{fieldError.password}</p>
        )} */}
        </fieldset>
        <button type="submit" class="btn btn-primary w-full">
          Login
        </button>
        <div class="mt-4 text-center text-sm">
          <a
            href="/forgot-password"
            class="ml-auto inline-block text-sm underline"
          >
            Forgot your password?
          </a>
        </div>
      </div>
    </form>
  );
}

function SubmitButton() {
  return (
    <button
      type="submit"
      class="btn btn-primary w-full"
      // disabled={singInForm.invalid || singInForm.submitting}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="mr-2 h-4 w-4"
        viewBox="0 0 24 24"
      >
        <g
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        >
          <path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <path d="m3 7l9 6l9-6" />
        </g>
      </svg>{" "}
      Login with Email
    </button>
  );
}

const SubmittingButton = () => {
  return (
    <button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="mr-2 h-4 w-4 animate-spin"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6V3m4.25 4.75L18.4 5.6M18 12h3m-4.75 4.25l2.15 2.15M12 18v3m-4.25-4.75L5.6 18.4M6 12H3m4.75-4.25L5.6 5.6"
        />
      </svg>
      Please wait...
    </button>
  );
};

// type SingInForm = {
//   email: string;
//   password: string;
// };

// type FieldErrors = {
//   email?: string[] | undefined;
//   password?: string[] | undefined;
// };

// let fieldErrors: FieldErrors = {};
// const [singInForm, { Form, Field, FieldArray }] = useForm<SingInForm>();

// export function SingInForm() {
//   const handleBlur = (event: FocusEvent) => {
//     const value = (event.target as HTMLInputElement).value;
//     const name = (event.target as HTMLInputElement).name;

//     if (value === "") return;

//     validate(singInForm, name as keyof SingInForm);
//   };

//   const handleSubmit: SubmitHandler<SingInForm> = async (values, event) => {
//     const form = event.target as HTMLFormElement;
//     const formData = new FormData(form);

//     const { data, error } = await actions.singIn.safe(formData);

//     if (error && isInputError(error)) {
//       fieldErrors = error.fields;
//     }
//   };

//   return (
//     <Form
//       method="post"
//       onSubmit={handleSubmit}
//       className="mx-auto grid w-[350px] gap-6"
//     >
//       <input {...getActionProps(actions.singIn)} />
//       <fieldset className="grid gap-2 text-center">
//         <h1 className="text-3xl font-bold">Login</h1>
//         <p className="text-balance text-muted-foreground">
//           Enter your email below to login to your account
//         </p>
//       </fieldset>
//       <div className="grid gap-4">
//         <fieldset className="grid gap-2">
//           <Field
//             name="email"
//             validate={[
//               required("Please enter your email."),
//               email("The email address is badly formatted."),
//             ]}
//           >
//             {(field, props) => (
//               <>
//                 <input
//                   {...props}
//                   id="email"
//                   name="email"
//                   type="email"
//                   label="Email"
//                   placeholder="m@example.com"
//                   // value={field.value as string}
//                   // error={field.error}
//                   onBlur={handleBlur}
//                   required
//                 />
//                 {field.error && <p className="text-error text-sm">{field.error}</p>}
//               </>
//             )}
//           </Field>
//         </fieldset>
//         <fieldset className="grid gap-2">
//           <Field
//             name="password"
//             validate={[
//               required("Please enter your password."),
//               minLength(8, "Password must be at least 8 characters long."),
//               maxLength(16, "Password must be at most 16 characters long."),
//             ]}
//           >
//             {(field, props) => (
//               <>
//                 <input
//                   {...props}
//                   id="password"
//                   type="password"
//                   label="Password"
//                   name="password"
//                   placeholder="*********"
//                   // value={field.value as string}
//                   // error={field.error}
//                   onBlur={handleBlur}
//                   required
//                 />
//                 {field.error && <p className="text-error text-sm">{field.error}</p>}
//               </>
//             )}
//           </Field>
//         </fieldset>
//         {singInForm.submitting && <SubmittingButton />}
//         {!singInForm.submitting && <SubmitButton />}
//         {/* <Show when={singInForm.submitting} fallback={<SubmitButton />}>
//           <SubmittingButton />
//         </Show> */}
//         <div className="mt-4 text-center text-sm">
//           <a
//             href="/forgot-password"
//             className="ml-auto inline-block text-sm underline"
//           >
//             Forgot your password?
//           </a>
//         </div>
//       </div>
//     </Form>
//   );
// }
