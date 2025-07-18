import { ref, onMounted } from "vue";

import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
export const usePembayaranStore = defineStore("pembayaranStore", () => {
  let snapToken  = ref<String>();
  let pembayaran = ref<any>([]);
  let detailPembayaran = ref([]);
  const savePayment = async(result:any,transaction_id:number) =>{
     const config = useRuntimeConfig();
    const { token } = useAuth()
  
      try {
      const response: any = await $fetch(`${config.public.apiBaseUrl}payment`, {
        method: 'POST',
        body: {
          result:result,
          transaction_id:transaction_id
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.value}` 
        },
      });

      return response;
    
    } catch (error) {
      console.error("Error fetching Snap token:", error);
    }
  }

  const checkPayment = async() =>{
    const config = useRuntimeConfig();
   const { token } = useAuth()
 
     try {
     const response: any = await $fetch(`${config.public.apiBaseUrl}/payment/check`, {
       method: 'GET',
       headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token.value}` 
       },
     });
  
     pembayaran.value = response.payment;
     detailPembayaran.value = response.status;

     return response;
   
   } catch (error) {
     console.error("Error fetching Snap token:", error);
   }
 }

  const fetchSnapToken = async (team_id:number,conference_type_id:number) => {
    const config = useRuntimeConfig();
    const { token } = useAuth()
  
    try {
      const response: any = await $fetch(`${config.public.apiBaseUrl}/payment/participant`, {
        method: 'POST',
        body: {team_id:team_id,conference_type_id:conference_type_id},
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.value}` 
        },
      });
      console.log(response.data.snap_token);
      snapToken.value = response.data.snap_token;

        window.snap.pay(response.data.snap_token,{
           onSuccess: async (result: any) => {
           try {
        
              await checkPayment();
              toast.success('Payment settlement !');
              navigateTo('/payment');
          
              } catch (error) {
            toast.error('Error saving payment!');
          }
        },
          onPending: async(result: any) => {
            try {
              navigateTo('/payment');
            
                } catch (error) {
              toast.error('Error saving payment!');
            }
            toast.warning('Pending Payment !');
          },
          onError: function(result: any) {
            console.log('Payment error', result);
            toast.error('Server Bermasalah !')
          },
          onClose: function() {
            toast.error('pembayaran di batalkan !');
            
          },
        });
      
    } catch (error) {
      console.error("Error fetching Snap token:", error);
    }
  };

  const doSnapToken = async(snapToken:string) => {

    if(snapToken == ''){
      toast.error('Snap Token kosong !');
    }else{
      window.snap.pay(snapToken,{
           onSuccess: async (result: any) => {
           try {

              await checkPayment();
              toast.success('Payment settlement !');
              navigateTo('/payment');

              
          
              } catch (error) {
            toast.error('Error saving payment!');
          }
        },
          onPending: async(result: any) => {
            try {
              navigateTo('/payment');
            
                } catch (error) {
              toast.error('Error saving payment!');
            }
            toast.warning('Pembayaran Pending,Segera lakukan pembayaran !');
          },
          onError: function(result: any) {
            console.log('Payment error', result);
            toast.error('Server Bermasalah !')
          },
          onClose: function() {
            toast.error('pembayaran di batalkan !');
            
          },
        });
    }
     
  }
  

  return {
    detailPembayaran,
    pembayaran,
    savePayment,
    doSnapToken,
    checkPayment,
    fetchSnapToken,

  };
});