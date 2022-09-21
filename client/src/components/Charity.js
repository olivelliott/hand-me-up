import { QUERY_CHARITIES } from "../utils/queries";
import { useQuery } from "@chakra-ui/react";

export default function CharityList() {
    const { data: allCharities } = useQuery(QUERY_CHARITIES)

    const charities = allCharities?.products || [];
    
    console.log(charities);
    
    return (
        <h1>HELLOWORLD</h1>
    )
}
