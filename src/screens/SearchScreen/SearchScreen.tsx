import { useLocation } from "wouter";
import { FieldWithAddButton } from "../../components/FieldWithAddButton/FieldWithAddButton"

export const SearchScreen = () => {
    const [, setLocation] = useLocation();

    return <FieldWithAddButton action={(value: string) => setLocation(`/weather/${value}`)} />
}