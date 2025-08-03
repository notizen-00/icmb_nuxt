<script setup>

defineProps({
    participant:{}
})

const config = useRuntimeConfig()
const siteUrl = config.public.ServerUrl;
console.log(siteUrl);

</script>
<template>
   <div class="max-w-sm mx-auto bg-white  shadow-md rounded-2xl overflow-hidden relative" >
  <!-- Ticket perforation (semicircle) -->
  <div class="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-black rounded-xl  z-10"></div>
  <div class="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-black rounded-full z-10"></div>

  <!-- Top Section -->
  <div class="p-6 pb-4">
    <div class="flex justify-between text-sm text-gray-600 mb-2">
      <div>
        <div class="uppercase text-xs">Form Of Participation</div>
        <div class="text-lg font-semibold text-black">{{ participant.form_of_participation }}</div>
      </div>
      <div class="text-right">
        <div class="uppercase text-xs">Date Verification</div>
        <div class="text-xs font-semibold text-slate-400">{{ formatDate(participant.updated_at) }}</div>
      </div>
    </div>

    <div class="mt-4 mb-4 text-sm">
      <div class="uppercase text-gray-500 text-xs">Conference Name</div>
      <div class="font-semibold text-black text-lg">{{ participant.team.name }}</div>
    </div>

    <div class="border-t border-dashed border-gray-300 my-4"></div>

    <div class="flex justify-center mb-4">
      <div class="bg-blue-500 rounded-xl p-3 text-white shadow">
       <i class="fal fa-signal-stream"></i>
      </div>
    </div>

    <div class="text-center text-xs text-gray-500 mb-4">
      Show this ticket at conference location !
    </div>

    <div class="flex justify-center">
      <!-- Placeholder QR Code -->
      <img
  :src="`https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=${siteUrl}site/${participant.team.slug}`"
  alt="QR Code"
/>

    </div>
  </div>

  <!-- Bottom Blue Section -->
  <div class="bg-blue-600 text-white flex justify-between items-center px-6 py-4 text-sm rounded-b-2xl">
    <div>
      <div class="text-xs uppercase text-blue-200">Participant</div>
      <div class="font-semibold text-md">{{ participant.corresponding_author }}</div>
    </div>
    <div class="text-right">
      <div class="text-xs uppercase text-blue-200">Participant Type</div>
      <div class="font-semibold text-xs">{{ participant.conference_type.name }}</div>
    </div>
  </div>
</div>


</template>