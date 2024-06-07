import { defineComponent } from 'vue'

interface CardProps {
  type?: 'primary' | 'dashed' | 'link'
}
const Card = defineComponent({
  setup(props: CardProps, { slots }) {
    return () => (
      <div class={`card card-${props.type}`}>{slots?.default?.()}</div>
    )
  }
})

export default Card
