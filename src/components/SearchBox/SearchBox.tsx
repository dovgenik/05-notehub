import css from "./SearchBox.module.css";


interface SearchBoxProps { 
    setState: (text:string | null)=> void,
};


export default function SearchBox(props: SearchBoxProps ) {


const handleChange = 
    (event: React.ChangeEvent<HTMLInputElement>) => props.setState(event.target.value.trim() === "" ? null : event.target.value);


  return (
    <>
      <input className={css.input} type="text" placeholder="Search notes" onChange={handleChange}/> 
    </>
  );
}


// export default function SearchBox(props: SearchBoxProps ) {


// const handleChange = useDebouncedCallback(
//     (event: React.ChangeEvent<HTMLInputElement>) => props.setState(event.target.value.trim() === "" ? null : event.target.value),
//     1000
//   );


//   return (
//     <>
//       <input className={css.input} type="text" placeholder="Search notes" onChange={handleChange}/> 
//     </>
//   );
// }
