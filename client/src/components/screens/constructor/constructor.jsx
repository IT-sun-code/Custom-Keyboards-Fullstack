import { useEffect } from "react";
import Heading from "../../ui/heading";
import FirstHeading from "../../ui/heading/firstHeading";
import SecondHeading from "../../ui/heading/secondHeading";

const Constructor = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Heading>
        <FirstHeading>КОНСТРУКТОР КЛАВИАТУРЫ</FirstHeading>
        <SecondHeading>Мы еще работаем над этой услугой</SecondHeading>
      </Heading>
    </>
  );
};

export default Constructor;
