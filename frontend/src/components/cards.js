import Card from "./card.js"

const Cards = () => {
  return (
      <div className="w-full h-full grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(340px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(380px,1fr))]">
        <Card/>
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    
  );
}

export default Cards;