import Image from 'next/image'
import classes from './hero.module.css'
const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/brett.jpg"
          alt="An image showing Max"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Brett</h1>
      <p>Web Developer</p>
    </section>
  )
}

export default Hero
