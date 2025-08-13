<script setup>
import { ref, computed } from 'vue';

// Popular icon categories with examples
const iconCategories = ref({
  'Navigation': [
    'mdi-home', 'mdi-menu', 'mdi-arrow-left', 'mdi-arrow-right', 'mdi-close',
    'mdi-chevron-up', 'mdi-chevron-down', 'mdi-dots-vertical', 'mdi-plus'
  ],
  'User & Account': [
    'mdi-account', 'mdi-account-circle', 'mdi-account-plus', 'mdi-account-edit',
    'mdi-login', 'mdi-logout', 'mdi-account-group', 'mdi-face-man', 'mdi-face-woman'
  ],
  'Communication': [
    'mdi-email', 'mdi-phone', 'mdi-message', 'mdi-chat', 'mdi-forum',
    'mdi-send', 'mdi-reply', 'mdi-share', 'mdi-bell'
  ],
  'Files & Documents': [
    'mdi-file', 'mdi-folder', 'mdi-download', 'mdi-upload', 'mdi-attachment',
    'mdi-file-pdf-box', 'mdi-file-word-box', 'mdi-file-excel-box', 'mdi-image'
  ],
  'Actions': [
    'mdi-edit', 'mdi-delete', 'mdi-save', 'mdi-copy', 'mdi-cut', 'mdi-paste',
    'mdi-undo', 'mdi-redo', 'mdi-refresh', 'mdi-sync'
  ],
  'Social & Media': [
    'mdi-heart', 'mdi-heart-outline', 'mdi-star', 'mdi-star-outline', 'mdi-thumb-up',
    'mdi-thumb-down', 'mdi-share-variant', 'mdi-bookmark', 'mdi-eye'
  ],
  'Technology': [
    'mdi-wifi', 'mdi-bluetooth', 'mdi-battery', 'mdi-cellphone', 'mdi-laptop',
    'mdi-desktop-classic', 'mdi-camera', 'mdi-microphone', 'mdi-speaker'
  ],
  'Status & Alerts': [
    'mdi-check', 'mdi-check-circle', 'mdi-close-circle', 'mdi-alert', 'mdi-information',
    'mdi-help-circle', 'mdi-warning', 'mdi-shield-check', 'mdi-lock'
  ]
});

const selectedIcon = ref('');
const searchQuery = ref('');

const copyIconName = (iconName) => {
  navigator.clipboard.writeText(iconName);
  selectedIcon.value = iconName;
  setTimeout(() => {
    selectedIcon.value = '';
  }, 2000);
};

const filteredCategories = computed(() => {
  if (!searchQuery.value) return iconCategories.value;
  
  const filtered = {};
  Object.entries(iconCategories.value).forEach(([category, icons]) => {
    const matchedIcons = icons.filter(icon => 
      icon.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
    if (matchedIcons.length > 0) {
      filtered[category] = matchedIcons;
    }
  });
  return filtered;
});
</script>

<template>
  <div class="icon-browser">
    <h2>Material Design Icons Browser</h2>
    <p class="description">
      Click on any icon to copy its name. You can use these icons with <code>&lt;v-icon&gt;icon-name&lt;/v-icon&gt;</code>
    </p>
    
    <!-- Search -->
    <v-text-field
      v-model="searchQuery"
      label="Search icons..."
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      clearable
      class="mb-4"
    />
    
    <!-- Success message -->
    <v-alert
      v-if="selectedIcon"
      type="success"
      class="mb-4"
      dismissible
    >
      Copied: <strong>{{ selectedIcon }}</strong>
    </v-alert>

    <!-- Icon Categories -->
    <div v-for="(icons, category) in filteredCategories" :key="category" class="category-section">
      <h3 class="category-title">{{ category }}</h3>
      <div class="icons-grid">
        <div
          v-for="icon in icons"
          :key="icon"
          class="icon-item"
          @click="copyIconName(icon)"
          :title="`Click to copy: ${icon}`"
        >
          <v-icon size="large" class="icon-display">{{ icon }}</v-icon>
          <span class="icon-name">{{ icon.replace('mdi-', '') }}</span>
        </div>
      </div>
    </div>
    
    <!-- Usage Examples -->
    <div class="usage-section mt-8">
      <h3>Usage Examples:</h3>
      <div class="code-examples">
        <div class="example">
          <h4>Basic Icon:</h4>
          <code>&lt;v-icon&gt;mdi-home&lt;/v-icon&gt;</code>
          <div class="result"><v-icon>mdi-home</v-icon></div>
        </div>
        
        <div class="example">
          <h4>Colored Icon:</h4>
          <code>&lt;v-icon color="primary"&gt;mdi-heart&lt;/v-icon&gt;</code>
          <div class="result"><v-icon color="primary">mdi-heart</v-icon></div>
        </div>
        
        <div class="example">
          <h4>Different Sizes:</h4>
          <code>&lt;v-icon size="small"&gt;mdi-star&lt;/v-icon&gt;</code>
          <div class="result">
            <v-icon size="small">mdi-star</v-icon>
            <v-icon>mdi-star</v-icon>
            <v-icon size="large">mdi-star</v-icon>
            <v-icon size="x-large">mdi-star</v-icon>
          </div>
        </div>
        
        <div class="example">
          <h4>Button with Icon:</h4>
          <code>&lt;v-btn&gt;&lt;v-icon left&gt;mdi-download&lt;/v-icon&gt;Download&lt;/v-btn&gt;</code>
          <div class="result">
            <v-btn color="primary">
              <v-icon left>mdi-download</v-icon>
              Download
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon-browser {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.description {
  margin-bottom: 20px;
  color: #666;
}

.category-section {
  margin-bottom: 30px;
}

.category-title {
  color: #ff9800;
  border-bottom: 2px solid #ff9800;
  padding-bottom: 5px;
  margin-bottom: 15px;
}

.icons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #fff;
}

.icon-item:hover {
  border-color: #ff9800;
  background: #fff3e0;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.icon-display {
  color: #ff9800;
  margin-bottom: 8px;
}

.icon-name {
  font-size: 0.8rem;
  text-align: center;
  color: #666;
  word-break: break-word;
}

.usage-section {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
}

.code-examples {
  display: grid;
  gap: 20px;
}

.example {
  background: white;
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid #ff9800;
}

.example h4 {
  margin: 0 0 10px 0;
  color: #333;
}

.example code {
  background: #f5f5f5;
  padding: 8px 12px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  display: block;
  margin: 10px 0;
}

.result {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 4px;
}
</style> 