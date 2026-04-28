import DefaultTheme from 'vitepress/theme'
import SkillPicker from './components/SkillPicker.vue'
import MemoryPicker from './components/MemoryPicker.vue'
import MaturityAssessment from './components/MaturityAssessment.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('SkillPicker', SkillPicker)
    app.component('MemoryPicker', MemoryPicker)
    app.component('MaturityAssessment', MaturityAssessment)
  },
}
