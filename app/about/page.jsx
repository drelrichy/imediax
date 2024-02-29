import Feed from "@/components/Feed";

const Home = () => (
  <section className='w-full flex-center flex-col'>
    <h1 className='head_text text-center'>
      Discover & Share
      <br className='max-md:hidden' />
      <span className='orange_gradient text-center'>1Community Projects</span>
    </h1>
    <p className='desc text-center'>
      Community Project tool for modern world to
      discover, create and share Community Development Projects
    </p>

    <Feed />
  </section>
);

export default Home;
