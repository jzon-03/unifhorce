# Quick AdSense Setup Checklist

## ⚡ Quick Start (5 Minutes)

### 1️⃣ Get Your Ad Slot IDs (Google AdSense)
```
1. Login: https://www.google.com/adsense
2. Go to: Ads → Overview → Display ads
3. Create 3 ad units (Responsive)
4. Copy each data-ad-slot ID
```

### 2️⃣ Update Configuration File
**File**: `src/app/config/adsense.config.ts`

```typescript
adSlots: {
  homeAfterAbout: 'PASTE_SLOT_ID_1_HERE',      
  homeAfterTestimonials: 'PASTE_SLOT_ID_2_HERE', 
  homeAfterResources: 'PASTE_SLOT_ID_3_HERE',
}
```

### 3️⃣ Build & Deploy
```bash
npm run build:prod
# Deploy dist/unifhorce to your hosting
```

### 4️⃣ Verify
- Wait 24-48 hours
- Check AdSense dashboard
- View site in incognito mode

## 📍 Current Ad Locations

| Location | File | Line |
|----------|------|------|
| After About | `home.component.html` | ~5 |
| After Testimonials | `home.component.html` | ~15 |
| After Resources | `home.component.html` | ~25 |

## 🎯 Adding New Ads

### Quick Template:
```html
<app-adsense 
  [adSlot]="adsenseConfig.adSlots.YOUR_SLOT_NAME"
  [adFormat]="adsenseConfig.formats.auto"
  [fullWidthResponsive]="true">
</app-adsense>
```

## 📊 Expected Results

- **First 48 hours**: Blank or test ads
- **Week 1**: Real ads start showing
- **Month 1**: Revenue stabilizes
- **Ongoing**: Optimize based on analytics

## ⚠️ Don't Forget

- [ ] Never click your own ads
- [ ] Don't tell users to click ads
- [ ] Maintain quality content
- [ ] Follow AdSense policies
- [ ] Monitor account regularly

## 🔗 Quick Links

- AdSense Dashboard: https://www.google.com/adsense
- Payment Settings: Ads → Payments
- Performance Reports: Ads → Reports
- Policy Center: Help → Policies

---
**Your Publisher ID**: `ca-pub-7601194250852039`