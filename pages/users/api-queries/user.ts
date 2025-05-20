import apiClient from "@/helpers/api-client"
import { useQuery } from "@tanstack/react-query"

const getUsers = async() => {
    const response = await apiClient.get("/org_users")
    return response.data
}
export const useOrgUsers = () => useQuery({ queryKey: ["org_users"], queryFn: getUsers })
