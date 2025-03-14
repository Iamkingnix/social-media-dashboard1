// ... (previous imports)
import { PostPreview } from '../../components/PostPreview';

export default function NewPostScreen() {
  // ... (previous code)

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Input
          label="Title"
          value={form.title}
          onChangeText={(text) => setForm(prev => ({ ...prev, title: text }))}
          placeholder="Enter post title"
        />

        <Input
          label="Description"
          value={form.description}
          onChangeText={(text) => setForm(prev => ({ ...prev, description: text }))}
          placeholder="Enter post description"
          multiline
          numberOfLines={4}
          style={styles.descriptionInput}
        />

        <PlatformSelector
          selectedPlatforms={form.platforms}
          onSelectPlatform={handlePlatformSelect}
        />

        {form.platforms.length > 0 && (
          <PostPreview
            platforms={form.platforms}
            text={form.description}
            username="YourUsername" // You can get this from your auth store
          />
        )}

        <DateTimePicker
          value={form.scheduledDate}
          onChange={handleScheduleChange}
          onClear={() => handleScheduleChange(undefined)}
          minimumDate={new Date()}
          label="Schedule Post (Optional)"
        />

        {/* ... (rest of the code) */}
      </View>
    </ScrollView>
  );
}