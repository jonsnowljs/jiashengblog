import Image from 'next/image'
import { Mail } from 'react-feather'

const Main = () => {
  return (
    <main className="container flex flex-col mx-auto flex-1 max-w-3xl px-6 justify-center">
      <div className="mb-2">
        <Image
          className="rounded-full transition-all duration-100"
          src="/images/avatar.svg"
          alt="avatar"
          width={120}
          height={120}
          priority
        />
      </div>
      <h1 className="font-bold mb-8 text-2xl heading-text">Jiasheng Lu</h1>

      <p className="mb-8">Full Stack Developer</p>

      {/* <p className="mt-8">
        Most of my work can be found on{' '}
        <a href="https://github.com/spencerwooo" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        .
      </p> */}
      <p className="flex space-x-2 items-center">
        <Mail size={15} />
        <a href="mailto:jiasheng.luu@gmail.com">jiasheng.luu#gmail.com</a>
      </p>
    </main>
  );
}

export default Main
