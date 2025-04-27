import { useUser } from "@/composables/auth/user";
import { auth_api } from "@/api_factory/modules/auth";
import { useCustomToast } from '@/composables/core/useCustomToast'
const { showToast } = useCustomToast();

const credential = {
  email: ref(""),
  password: ref(""),
};

export const use_auth_login = () => {
  const router = useRouter();
  const loading = ref(false);

  const isFormDisabled = computed(() => {
    return (
      loading.value || !credential.email.value || !credential.password.value
    );
  });

  const login = async (payload: { email: Record<string, any>, password: Record<string, any> }) => {
    loading.value = true;
    const res = (await auth_api.$_login({
      email: payload.email,
      password: payload.password
    })) as any;
    console.log(res, 'rse hee')
    if (res.status === 200 || res.status === 201) {
      useUser().createUser(res.data);
      showToast({
        title: "Success",
        message: 'Login was successfully',
        toastType: "success",
        duration: 3000
      });
      router.push("/dashboard");
    } else {
      showToast({
        title: "Error",
        message: res?.data?.error  || "Something went wrong",
        toastType: "error",
        duration: 3000
      });
    }
    return res
  };
  return { credential, login, loading, isFormDisabled };
};
