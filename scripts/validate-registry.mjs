import path from 'node:path';

const toolsFilePath = path.resolve('src/config/tools.ts');
console.log('Validating tools registry in', toolsFilePath);

async function validate() {
  const { TOOLS } = await import('../src/config/tools.ts');
  const errors = [];
  const slugs = new Set();
  const titles = new Set();
  const allSlugs = new Set(TOOLS.map((t) => t.slug));

  for (const tool of TOOLS) {
    if (slugs.has(tool.slug)) {
      errors.push(`Duplicate slug: ${tool.slug}`);
    }
    slugs.add(tool.slug);

    if (titles.has(tool.seoTitle)) {
      errors.push(`Duplicate SEO title: ${tool.seoTitle}`);
    }
    titles.add(tool.seoTitle);

    if (tool.seoTitle.length > 70) {
      errors.push(`SEO title too long for ${tool.slug}: ${tool.seoTitle.length} chars (max 70)`);
    }

    if (tool.shortDescription.length > 120) {
      errors.push(
        `Short description too long for ${tool.slug}: ${tool.shortDescription.length} chars (max 120)`
      );
    }

    for (const rel of tool.relatedSlugs) {
      if (!allSlugs.has(rel)) {
        errors.push(`Related slug "${rel}" referenced in ${tool.slug} does not exist`);
      }
    }

    if (!tool.content.faqs || tool.content.faqs.length < 5) {
      errors.push(`Tool ${tool.slug} has fewer than 5 FAQs (${tool.content.faqs?.length || 0})`);
    }

    const fullContent = [
      tool.content.howTo.join(' '),
      tool.content.about,
      tool.content.faqs.map((f) => `${f.q} ${f.a}`).join(' '),
    ].join(' ');

    const totalWords = fullContent.trim().split(/\s+/).length;
    if (totalWords < 400) {
      errors.push(`Tool ${tool.slug} has only ${totalWords} total words (needs >= 400)`);
    }
  }

  if (errors.length > 0) {
    console.error('❌ Registry validation failed with errors:');
    for (const err of errors) {
      console.error(' - ' + err);
    }
    process.exit(1);
  } else {
    console.log(`✅ Registry validation passed! Total tools verified: ${TOOLS.length}`);
  }
}

validate().catch((err) => {
  console.error('Validation script error:', err);
  process.exit(1);
});
