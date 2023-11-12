<script lang='ts'>
  let zhe = {'ssg':'sssssa'}
</script>

<!-- Open the modal using ID.showModal() method -->
<button class="btn" {...{"onclick":"my_modal_1.showModal()"}}>open modal</button>
<button class="btn" {...{"onclick":"my_modal_1.close()"}}>close modal</button>
<dialog id="my_modal_1" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Hello!</h3>
    <p class="py-4">Press ESC key or click outside to close</p>
    <button class="btn" {...{"onclick":"my_modal_1.close()"}}>close modal</button>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>