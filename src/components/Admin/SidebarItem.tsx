import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { PathRouteProps, useLocation, useParams } from "react-router-dom";

interface ItemProps {
    description: string
    icon: IconDefinition
    uri: string
}

export const SidebarItem = (props: ItemProps) => {
    const [selected, setSelected] = useState(false)
    const location = useLocation()
    
    useEffect(() => {
        function handleSelect() {
            console.log(location.pathname)
            if (location.pathname == props.uri) {
                setSelected(!selected)
            }
        }
        handleSelect()
    }, [])

    return (
        <li className="flex justify-center items-center ">
            <a href={props.uri} className={`flex items-center justify-center ${props.description && "w-full" } gap-2 px-4 py-4 min-h-[20px] min-w-[20px] rounded-full border-2 boder-white text-center ${props.uri === "/" && "bg-violet-900"} ${selected && "bg-green-600"} hover:bg-slate-500 cursor-pointer transition-colors uppercase`}>
                <FontAwesomeIcon icon={props.icon} />
                {props.description}
            </a>
        </li>
    )
}