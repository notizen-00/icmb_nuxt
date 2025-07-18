<script setup lang="ts">
import { columns } from '@/components/payment/components/columns'
import DataTable from '@/components/payment/components/DataTable.vue'

const pembayaranStore = usePembayaranStore();
const participantStore = useParticipantStore();
const isLoading = ref(false)
  participantStore.fetchDetail()
  pembayaranStore.checkPayment()




</script>

<template>
  <div class="w-full flex flex-col items-stretch gap-4">
    <div class="flex flex-wrap items-end justify-between gap-2">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">
          Payment
        </h2>
        <p class="text-muted-foreground">
          Here&apos;s a list of your payment!
        </p>       
      </div>
    </div>
     <div class="flex justify-end w-full">
        <Button  class="flex justify-end text-end"  @click="pembayaranStore.fetchSnapToken(participantStore.detailParticipant.team[0].id,participantStore.detailParticipant.participant[0].conference_type_id)"><i class="fal fa-credit-card mx-3"></i> Create Payment </Button>
     </div>
    <!-- <BaseLoader v-if="isLoading"></BaseLoader> -->
    <DataTable  :data="pembayaranStore.detailPembayaran" :columns="columns" ></DataTable>
  </div>
</template>

<style scoped>

</style>    