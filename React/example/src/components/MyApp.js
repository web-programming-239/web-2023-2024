const persons = [{
    name: 'ЛедиБаг', imageUrl: 'https://miraculous.su/images/characters/ladybug_a.jpg', realName: "Маринетт"
}, {
    name: 'Мистер Баг', imageUrl: 'https://miraculous.su/images/characters/adrien_e.jpg', realName: "Адриан"
}, {
    name: 'Антибаг', imageUrl: 'https://miraculous.su/images/characters/chloe_d.jpg', realName: "Хлоя"
}];

const letter = "Дорогая Леди Баг, Адриан - это супер-кот!"

function PersonPhoto({url, size}) {
    return <img
        src={url}
        style={{
            width: size, height: size, borderRadius: size / 2
        }}
        alt={""}/>
}

function Person({data}) {
    function handlerClick() {
        alert(data.realName)
    }

    return <div
        style={{
            margin: "1em", textAlign: "center"
        }}
        onClick={handlerClick}
    >
        <h1>{data.name}</h1>
        <PersonPhoto url={data.imageUrl} size={200}/>
    </div>
}

function MyApp() {
    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div style={{display: "flex", justifyContent: "center"}}>
                {persons.map((data) => <Person data={data}/>)}
            </div>
            <h3 style={{textAlign: 'center'}}>Напиши письмо Леди Баг и она обязательно ответит</h3>
            <textarea rows="10" style={{width: "30em"}} placeholder={letter}></textarea>
        </div>);
}

export default MyApp