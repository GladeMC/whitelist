export const fetchUUID = async (name: string): Promise<string | null> => {
    const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${name}`)
    if (response.status !== 200) return null
    const json = await response.json()
    return json.id
}