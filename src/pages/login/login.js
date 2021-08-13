import { Title } from "../../components";
import LoginForm from "../../components/loginform";

export default function Login() {
  return (
    <div className="bg-loginBg min-h-full flex-col content-center">
      <nav>
        <Title></Title>
      </nav>
      <div className="mx-auto mt-4 text-center font-sans text-2xl">log.in</div>
      <section className="container mx-auto w-80">
        <LoginForm></LoginForm>
      </section>
      <section className='flex justify-evenly w-30 mx-auto mt-6' >
        <button className="bg-loginInput shadow-me rounded-3xl w-9 h-9 flex">
          <a twclass="w-6 m-auto" name="instagram" />
        </button>
        <button className="bg-loginInput shadow-me rounded-3xl w-9 h-9 flex">
          <a twclass="w-6 m-auto" name="facebook" />
        </button>
        <button className="bg-loginInput shadow-me rounded-3xl w-9 h-9 flex">
          <a twclass="w-6 m-auto" name="google" />
        </button>
      </section>
    </div>
  );
}
