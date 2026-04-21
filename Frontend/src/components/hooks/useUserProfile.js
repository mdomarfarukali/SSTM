import { useEffect, useState } from "react";
import axios from "axios";

const useUserProfile = (defaultProfile) => {
    const [profile, setProfile] = useState(defaultProfile);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get("/API/auth/me", {
                    withCredentials: true,
                    // ❌ REMOVE this if you're using cookies
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                // console.log("\nFetchedData: ", data.user);

                if (data?.user) {
                    const updatedProfile = {
                        ...defaultProfile,
                        name: data.user.name,
                        email: data.user.email,
                        city: data.user.city,
                        phone: data.user.phone,
                        country: data.user.country,
                        postal: data.user.postal,
                        photo: data.user.avater || "/userAvatarTrimmed.png",
                    };

                    setProfile(updatedProfile);

                    // Cache for fallback (UI only)
                    localStorage.setItem("userProfile", JSON.stringify(updatedProfile));

                    setLoading(false);
                    return;
                }
            } catch (err) {
                console.warn("Backend fetch failed, using localStorage fallback");
                setError(err);
            }

            // 🔄 Fallback to localStorage
            const storedProfile = localStorage.getItem("userProfile");
            if (storedProfile) {
                try {
                    setProfile(JSON.parse(storedProfile));
                } catch (err) {
                    console.warn("Invalid localStorage data");
                }
            }

            setLoading(false);
        };

        fetchUser();
    }, [defaultProfile]);

    return { profile, setProfile, loading, error };
};

export default useUserProfile;