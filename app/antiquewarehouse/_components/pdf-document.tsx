import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type {
  UrlMappingEntry,
  CategoryMapping,
  CleanCategory,
} from "../types";

const brand = "#C41E3A";
const slate900 = "#1e293b";
const slate600 = "#475569";
const slate400 = "#94a3b8";
const slate200 = "#e2e8f0";
const slate50 = "#f8fafc";
const emerald600 = "#059669";
const amber600 = "#d97706";

const s = StyleSheet.create({
  // Page
  page: {
    padding: 40,
    paddingBottom: 60,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: slate900,
  },
  pageNumber: {
    position: "absolute",
    bottom: 25,
    right: 40,
    fontSize: 8,
    color: slate400,
  },
  pageFooter: {
    position: "absolute",
    bottom: 25,
    left: 40,
    fontSize: 8,
    color: slate400,
  },

  // Cover
  coverPage: {
    padding: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  coverAccent: {
    width: 60,
    height: 4,
    backgroundColor: brand,
    marginBottom: 24,
  },
  coverTitle: {
    fontSize: 32,
    fontFamily: "Helvetica-Bold",
    color: slate900,
    marginBottom: 8,
  },
  coverSubtitle: {
    fontSize: 18,
    color: brand,
    fontFamily: "Helvetica-Bold",
    marginBottom: 32,
  },
  coverMeta: {
    fontSize: 11,
    color: slate600,
    marginBottom: 6,
    textAlign: "center",
  },

  // Section
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: brand,
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: brand,
  },
  sectionSubtitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: slate900,
    marginBottom: 8,
    marginTop: 16,
  },
  paragraph: {
    fontSize: 10,
    color: slate600,
    lineHeight: 1.6,
    marginBottom: 12,
  },

  // Stats grid
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: slate50,
    borderWidth: 1,
    borderColor: slate200,
    borderRadius: 4,
    padding: 12,
  },
  statLabel: {
    fontSize: 8,
    color: slate400,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: slate900,
  },
  statDetail: {
    fontSize: 8,
    color: slate600,
    marginTop: 2,
  },

  // Table
  tableHeader: {
    flexDirection: "row",
    backgroundColor: slate900,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  tableHeaderCell: {
    color: "#ffffff",
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    padding: 8,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: slate200,
  },
  tableRowAlt: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: slate200,
    backgroundColor: slate50,
  },
  tableCell: {
    fontSize: 9,
    padding: 6,
    paddingVertical: 5,
    color: slate600,
  },
  tableCellBold: {
    fontSize: 9,
    padding: 6,
    paddingVertical: 5,
    fontFamily: "Helvetica-Bold",
    color: slate900,
  },

  // Badge
  badge: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: "#ffffff",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    textTransform: "uppercase",
  },
  badgeGreen: { backgroundColor: emerald600 },
  badgeAmber: { backgroundColor: amber600 },
  badgeRed: { backgroundColor: brand },

  // URL pattern
  patternRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: slate50,
    borderWidth: 1,
    borderColor: slate200,
    borderRadius: 4,
    padding: 10,
    marginBottom: 8,
  },
  patternLabel: {
    width: 80,
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: brand,
  },
  patternCode: {
    flex: 1,
    fontSize: 9,
    fontFamily: "Courier",
    color: slate600,
    backgroundColor: "#ffffff",
    padding: 6,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: slate200,
  },
  patternArrow: {
    fontSize: 12,
    color: slate400,
    marginHorizontal: 8,
  },
  patternCodeNew: {
    flex: 1,
    fontSize: 9,
    fontFamily: "Courier",
    padding: 6,
    borderRadius: 3,
    borderWidth: 1,
  },

  // Compact URL table
  urlTableCell: {
    fontSize: 7.5,
    fontFamily: "Courier",
    padding: 4,
    paddingVertical: 3,
    color: slate600,
  },
  urlTableHeaderCell: {
    color: "#ffffff",
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    padding: 6,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },

  // Translation card
  translationCard: {
    borderWidth: 1,
    borderColor: slate200,
    borderRadius: 4,
    padding: 10,
    marginBottom: 8,
  },
  langLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: brand,
    marginBottom: 2,
    textTransform: "uppercase",
  },
  productName: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: slate900,
    marginBottom: 2,
  },
  productDesc: {
    fontSize: 8,
    color: slate600,
    lineHeight: 1.4,
  },
  productMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: slate200,
  },
});

// Helpers
function StatusBadge({ type }: { type: string }) {
  const badgeStyle =
    type === "Match"
      ? s.badgeGreen
      : type === "Renamed"
        ? s.badgeAmber
        : s.badgeRed;
  return <Text style={[s.badge, badgeStyle]}>{type}</Text>;
}

function TypeBadge({ type }: { type: string }) {
  const badgeStyle =
    type === "product" || type === "subcategory"
      ? s.badgeGreen
      : type === "pagination"
        ? s.badgeAmber
        : s.badgeRed;
  return <Text style={[s.badge, badgeStyle]}>{type}</Text>;
}

function Footer() {
  return (
    <>
      <Text
        style={s.pageNumber}
        render={({ pageNumber, totalPages }) =>
          `${pageNumber} / ${totalPages}`
        }
        fixed
      />
      <Text style={s.pageFooter} fixed>
        antiquewarehouse.nl — Migration Report
      </Text>
    </>
  );
}

// Props
interface MigrationReportPDFProps {
  urls: UrlMappingEntry[];
  categories: CategoryMapping[];
  cleanCategories: CleanCategory[];
}

export function MigrationReportPDF({
  urls,
  categories,
  cleanCategories,
}: MigrationReportPDFProps) {
  // Compute stats
  const productUrls = urls.filter((u) => u.type === "product");
  const uniqueProducts = new Set(
    productUrls.map((u) => u.article_number).filter(Boolean)
  ).size;
  const totalProducts = productUrls.length;
  const oldCatCount = cleanCategories.length;
  const newCatCount = categories.length;
  const oldSubCount = cleanCategories.reduce(
    (sum, c) => sum + c.subcategories.length,
    0
  );
  const newSubCount = categories.reduce(
    (sum, c) => sum + c.subcategories.length,
    0
  );

  // Product count per old category
  const productCountMap: Record<string, number> = {};
  for (const cat of cleanCategories) {
    productCountMap[cat.name.nl] = cat.subcategories.reduce(
      (sum, sub) => sum + sub.products.length,
      0
    );
  }

  // Dropped categories
  const mappedOldNames = new Set<string>();
  for (const m of categories) {
    for (const old of m.old) mappedOldNames.add(old);
  }
  const droppedCats = cleanCategories
    .filter((c) => !mappedOldNames.has(c.name.nl))
    .map((c) => c.name.nl);

  // URLs grouped by type
  const urlsByType: Record<string, UrlMappingEntry[]> = {};
  for (const u of urls) {
    if (!urlsByType[u.type]) urlsByType[u.type] = [];
    urlsByType[u.type].push(u);
  }

  // Sample products for translation
  const sampleProducts: {
    product: (typeof cleanCategories)[0]["subcategories"][0]["products"][0];
    category: string;
  }[] = [];
  outer: for (const cat of cleanCategories) {
    for (const sub of cat.subcategories) {
      for (const prod of sub.products) {
        if (sampleProducts.length >= 6) break outer;
        sampleProducts.push({ product: prod, category: cat.name.nl });
      }
    }
  }

  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Document
      title="Antique Warehouse - Migration Report"
      author="Data Visualizer"
    >
      {/* ── COVER ── */}
      <Page size="A4" style={[s.page, s.coverPage]}>
        <View style={s.coverAccent} />
        <Text style={s.coverTitle}>Antique Warehouse</Text>
        <Text style={s.coverSubtitle}>Website Migration Report</Text>
        <Text style={s.coverMeta}>Custom PHP → WordPress</Text>
        <Text style={s.coverMeta}>antiquewarehouse.nl</Text>
        <Text style={[s.coverMeta, { marginTop: 20 }]}>{today}</Text>
        <Footer />
      </Page>

      {/* ── EXECUTIVE SUMMARY ── */}
      <Page size="A4" style={s.page}>
        <Text style={s.sectionTitle}>Executive Summary</Text>
        <Text style={s.paragraph}>
          This report provides a comprehensive overview of the website migration
          for antiquewarehouse.nl from a custom-built PHP platform to WordPress.
          The migration encompasses URL restructuring, category reorganization,
          and multilingual content transfer across Dutch, English, and German.
        </Text>
        <Text style={s.paragraph}>
          All existing URLs have been mapped to their new locations using 301
          permanent redirects. This ensures that visitors arriving via old links
          or search engine results will be seamlessly forwarded to the correct
          new pages, preserving both user experience and SEO value.
        </Text>

        <Text style={s.sectionSubtitle}>Key Figures</Text>
        <View style={s.statsRow}>
          <View style={s.statBox}>
            <Text style={s.statLabel}>Unique Products</Text>
            <Text style={s.statValue}>
              {uniqueProducts > 0 ? uniqueProducts.toLocaleString() : "—"}
            </Text>
            <Text style={s.statDetail}>
              {totalProducts > 0
                ? `${totalProducts.toLocaleString()} total incl. duplicates`
                : ""}
            </Text>
          </View>
          <View style={s.statBox}>
            <Text style={s.statLabel}>Categories</Text>
            <Text style={s.statValue}>
              {oldCatCount > 0 ? `${oldCatCount} → ${newCatCount}` : "—"}
            </Text>
            <Text style={s.statDetail}>
              {oldCatCount - newCatCount > 0
                ? `${oldCatCount - newCatCount} dropped`
                : ""}
            </Text>
          </View>
          <View style={s.statBox}>
            <Text style={s.statLabel}>Subcategories</Text>
            <Text style={s.statValue}>
              {oldSubCount > 0 ? `${oldSubCount} → ${newSubCount}` : "—"}
            </Text>
            <Text style={s.statDetail}>
              {oldSubCount - newSubCount > 0
                ? `${oldSubCount - newSubCount} consolidated`
                : ""}
            </Text>
          </View>
        </View>
        <View style={s.statsRow}>
          <View style={s.statBox}>
            <Text style={s.statLabel}>URL Redirects</Text>
            <Text style={s.statValue}>
              {urls.length > 0 ? urls.length.toLocaleString() : "—"}
            </Text>
            <Text style={s.statDetail}>301 permanent redirects configured</Text>
          </View>
          <View style={s.statBox}>
            <Text style={s.statLabel}>Languages</Text>
            <Text style={s.statValue}>3</Text>
            <Text style={s.statDetail}>Dutch / English / German</Text>
          </View>
          <View style={s.statBox}>
            <Text style={s.statLabel}>Platform</Text>
            <Text style={s.statValue}>WordPress</Text>
            <Text style={s.statDetail}>Migrated from custom PHP</Text>
          </View>
        </View>
        <Footer />
      </Page>

      {/* ── CATEGORY RESTRUCTURING ── */}
      <Page size="A4" style={s.page}>
        <Text style={s.sectionTitle}>Category Restructuring</Text>
        <Text style={s.paragraph}>
          The category structure has been simplified from {oldCatCount} to{" "}
          {newCatCount} categories, consolidating related product groups for
          better navigation and SEO. {droppedCats.length > 0 &&
            `${droppedCats.length} categories have been dropped and their traffic will be redirected to the main products page (/producten/).`}
        </Text>

        {/* Mapped categories table */}
        <Text style={s.sectionSubtitle}>Category Mapping</Text>
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, { width: "15%" }]}>Status</Text>
          <Text style={[s.tableHeaderCell, { width: "30%" }]}>
            Old Category
          </Text>
          <Text style={[s.tableHeaderCell, { width: "30%" }]}>
            New Category
          </Text>
          <Text
            style={[s.tableHeaderCell, { width: "12%", textAlign: "right" }]}
          >
            Products
          </Text>
          <Text
            style={[s.tableHeaderCell, { width: "13%", textAlign: "right" }]}
          >
            Subcats
          </Text>
        </View>
        {categories.map((m, i) => {
          const isMatch = m.old.length === 1 && m.old[0] === m.new;
          const count = m.old.reduce(
            (sum, name) => sum + (productCountMap[name] || 0),
            0
          );
          return (
            <View
              key={i}
              style={i % 2 === 0 ? s.tableRow : s.tableRowAlt}
              wrap={false}
            >
              <View style={[s.tableCell, { width: "15%" }]}>
                <StatusBadge type={isMatch ? "Match" : "Renamed"} />
              </View>
              <Text style={[s.tableCell, { width: "30%" }]}>
                {m.old.join(", ")}
              </Text>
              <Text style={[s.tableCellBold, { width: "30%" }]}>{m.new}</Text>
              <Text
                style={[s.tableCell, { width: "12%", textAlign: "right" }]}
              >
                {count}
              </Text>
              <Text
                style={[s.tableCell, { width: "13%", textAlign: "right" }]}
              >
                {m.subcategories.length}
              </Text>
            </View>
          );
        })}

        {/* Dropped categories */}
        {droppedCats.length > 0 && (
          <>
            <Text style={s.sectionSubtitle}>Dropped Categories</Text>
            <Text style={[s.paragraph, { marginBottom: 8 }]}>
              The following categories have been removed. All incoming traffic to
              these pages will be redirected to /producten/.
            </Text>
            {droppedCats.map((name, i) => (
              <View
                key={i}
                style={i % 2 === 0 ? s.tableRow : s.tableRowAlt}
                wrap={false}
              >
                <View style={[s.tableCell, { width: "15%" }]}>
                  <StatusBadge type="Dropped" />
                </View>
                <Text style={[s.tableCell, { width: "50%" }]}>{name}</Text>
                <Text
                  style={[
                    s.tableCell,
                    { width: "20%", color: slate400, fontStyle: "italic" },
                  ]}
                >
                  → /producten/
                </Text>
                <Text
                  style={[s.tableCell, { width: "15%", textAlign: "right" }]}
                >
                  {productCountMap[name] || 0} products
                </Text>
              </View>
            ))}
          </>
        )}
        <Footer />
      </Page>

      {/* ── URL STRUCTURE CHANGES ── */}
      <Page size="A4" style={s.page}>
        <Text style={s.sectionTitle}>URL Structure Changes</Text>
        <Text style={s.paragraph}>
          The URL structure has been modernized for better SEO performance and
          readability. Product URLs now use descriptive slugs instead of numeric
          IDs, and all product categories are consistently organized under a
          /producten/ prefix.
        </Text>

        <View style={s.patternRow}>
          <Text style={s.patternLabel}>Products</Text>
          <Text style={s.patternCode}>/producten/show/2755</Text>
          <Text style={s.patternArrow}>→</Text>
          <Text
            style={[
              s.patternCodeNew,
              { color: emerald600, borderColor: emerald600 },
            ]}
          >
            /product/antieke-globe-wernicke/
          </Text>
        </View>
        <Text style={[s.paragraph, { fontSize: 9, marginLeft: 80 }]}>
          Numeric IDs replaced with SEO-friendly, descriptive slugs based on
          product names.
        </Text>

        <View style={s.patternRow}>
          <Text style={s.patternLabel}>Categories</Text>
          <Text style={s.patternCode}>
            /&#123;categorie&#125;/&#123;subcategorie&#125;
          </Text>
          <Text style={s.patternArrow}>→</Text>
          <Text
            style={[
              s.patternCodeNew,
              { color: emerald600, borderColor: emerald600 },
            ]}
          >
            /producten/&#123;categorie&#125;/&#123;subcategorie&#125;/
          </Text>
        </View>
        <Text style={[s.paragraph, { fontSize: 9, marginLeft: 80 }]}>
          All categories nested under /producten/ with consistent trailing
          slashes.
        </Text>

        <View style={s.patternRow}>
          <Text style={s.patternLabel}>Pagination</Text>
          <Text style={s.patternCode}>
            /&#123;cat&#125;/&#123;sub&#125;/pagina/2
          </Text>
          <Text style={s.patternArrow}>→</Text>
          <Text style={[s.patternCodeNew, { color: brand, borderColor: brand }]}>
            Removed
          </Text>
        </View>
        <Text style={[s.paragraph, { fontSize: 9, marginLeft: 80 }]}>
          Server-side pagination pages removed. Pagination is now handled
          client-side with JavaScript, eliminating duplicate content issues.
        </Text>

        <Footer />
      </Page>

      {/* ── URL REDIRECTS ── */}
      <Page size="A4" style={s.page}>
        <Text style={s.sectionTitle}>URL Redirect Mapping</Text>
        <Text style={s.paragraph}>
          A total of {urls.length.toLocaleString()} URL redirects have been
          configured to ensure a seamless transition. These 301 (permanent)
          redirects will automatically send visitors and search engines from old
          URLs to their new locations, preserving link equity and preventing 404
          errors.
        </Text>

        {/* Summary */}
        <Text style={s.sectionSubtitle}>Summary by Type</Text>
        <View style={s.statsRow}>
          {(
            [
              ["product", "Products"],
              ["subcategory", "Subcategories"],
              ["pagination", "Pagination"],
              ["dropped", "Dropped"],
            ] as const
          ).map(([type, label]) => (
            <View key={type} style={s.statBox}>
              <Text style={s.statLabel}>{label}</Text>
              <Text style={s.statValue}>
                {(urlsByType[type]?.length || 0).toLocaleString()}
              </Text>
            </View>
          ))}
        </View>

        {/* Dropped URLs */}
        {urlsByType["dropped"] && urlsByType["dropped"].length > 0 && (
          <>
            <Text style={s.sectionSubtitle}>
              Dropped URLs ({urlsByType["dropped"].length})
            </Text>
            <View style={s.tableHeader}>
              <Text style={[s.urlTableHeaderCell, { width: "50%" }]}>
                Old URL
              </Text>
              <Text style={[s.urlTableHeaderCell, { width: "50%" }]}>
                Redirects To
              </Text>
            </View>
            {urlsByType["dropped"].map((u, i) => (
              <View
                key={i}
                style={i % 2 === 0 ? s.tableRow : s.tableRowAlt}
                wrap={false}
              >
                <Text style={[s.urlTableCell, { width: "50%" }]}>
                  {u.old_url}
                </Text>
                <Text style={[s.urlTableCell, { width: "50%" }]}>
                  {u.new_url}
                </Text>
              </View>
            ))}
          </>
        )}

        {/* Subcategory URLs */}
        {urlsByType["subcategory"] &&
          urlsByType["subcategory"].length > 0 && (
            <>
              <Text style={s.sectionSubtitle}>
                Subcategory URLs ({urlsByType["subcategory"].length})
              </Text>
              <View style={s.tableHeader}>
                <Text style={[s.urlTableHeaderCell, { width: "50%" }]}>
                  Old URL
                </Text>
                <Text style={[s.urlTableHeaderCell, { width: "50%" }]}>
                  New URL
                </Text>
              </View>
              {urlsByType["subcategory"].map((u, i) => (
                <View
                  key={i}
                  style={i % 2 === 0 ? s.tableRow : s.tableRowAlt}
                  wrap={false}
                >
                  <Text style={[s.urlTableCell, { width: "50%" }]}>
                    {u.old_url}
                  </Text>
                  <Text style={[s.urlTableCell, { width: "50%" }]}>
                    {u.new_url}
                  </Text>
                </View>
              ))}
            </>
          )}

        <Footer />
      </Page>

      {/* Pagination URLs */}
      {urlsByType["pagination"] && urlsByType["pagination"].length > 0 && (
        <Page size="A4" style={s.page}>
          <Text style={s.sectionTitle}>
            Pagination URLs ({urlsByType["pagination"].length})
          </Text>
          <Text style={s.paragraph}>
            Old pagination pages (/pagina/N) are redirected to their parent
            category page. Pagination is now handled client-side.
          </Text>
          <View style={s.tableHeader}>
            <Text style={[s.urlTableHeaderCell, { width: "50%" }]}>
              Old URL
            </Text>
            <Text style={[s.urlTableHeaderCell, { width: "50%" }]}>
              Redirects To
            </Text>
          </View>
          {urlsByType["pagination"].map((u, i) => (
            <View
              key={i}
              style={i % 2 === 0 ? s.tableRow : s.tableRowAlt}
              wrap={false}
            >
              <Text style={[s.urlTableCell, { width: "50%" }]}>
                {u.old_url}
              </Text>
              <Text style={[s.urlTableCell, { width: "50%" }]}>
                {u.new_url}
              </Text>
            </View>
          ))}
          <Footer />
        </Page>
      )}

      {/* Product URLs */}
      {urlsByType["product"] && urlsByType["product"].length > 0 && (
        <Page size="A4" style={s.page}>
          <Text style={s.sectionTitle}>
            Product URLs ({urlsByType["product"].length})
          </Text>
          <Text style={s.paragraph}>
            Each product has been mapped from its old numeric ID URL to a new
            SEO-friendly slug URL. Article numbers are preserved in the WordPress
            database for reference.
          </Text>
          <View style={s.tableHeader} fixed>
            <Text style={[s.urlTableHeaderCell, { width: "15%" }]}>
              Article #
            </Text>
            <Text style={[s.urlTableHeaderCell, { width: "40%" }]}>
              Old URL
            </Text>
            <Text style={[s.urlTableHeaderCell, { width: "45%" }]}>
              New URL
            </Text>
          </View>
          {urlsByType["product"].map((u, i) => (
            <View
              key={i}
              style={i % 2 === 0 ? s.tableRow : s.tableRowAlt}
              wrap={false}
            >
              <Text style={[s.urlTableCell, { width: "15%" }]}>
                {u.article_number || "—"}
              </Text>
              <Text style={[s.urlTableCell, { width: "40%" }]}>
                {u.old_url}
              </Text>
              <Text style={[s.urlTableCell, { width: "45%" }]}>
                {u.new_url}
              </Text>
            </View>
          ))}
          <Footer />
        </Page>
      )}

      {/* ── MULTILINGUAL CONTENT ── */}
      {sampleProducts.length > 0 && (
        <Page size="A4" style={s.page}>
          <Text style={s.sectionTitle}>Multilingual Content</Text>
          <Text style={s.paragraph}>
            All product content has been migrated with full translations in Dutch
            (NL), English (EN), and German (DE). This includes product names and
            descriptions. Below are sample products demonstrating the three-language
            support.
          </Text>

          {sampleProducts.map((item, i) => (
            <View key={i} style={s.translationCard} wrap={false}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{ fontSize: 8, color: slate400, fontStyle: "italic" }}
                >
                  {item.category} · #{item.product.articleNumber}
                </Text>
                <Text
                  style={{ fontSize: 10, fontFamily: "Helvetica-Bold", color: brand }}
                >
                  {item.product.price}
                </Text>
              </View>

              {(["nl", "en", "de"] as const).map((lang) => (
                <View key={lang} style={{ marginBottom: lang !== "de" ? 6 : 0 }}>
                  <Text style={s.langLabel}>
                    {lang === "nl"
                      ? "Nederlands"
                      : lang === "en"
                        ? "English"
                        : "Deutsch"}
                  </Text>
                  <Text style={s.productName}>
                    {item.product.name[lang] || "—"}
                  </Text>
                  <Text style={s.productDesc} hyphenationCallback={() => []}>
                    {item.product.description[lang]
                      ? item.product.description[lang].length > 150
                        ? item.product.description[lang].substring(0, 150) +
                          "..."
                        : item.product.description[lang]
                      : "—"}
                  </Text>
                </View>
              ))}
            </View>
          ))}
          <Footer />
        </Page>
      )}
    </Document>
  );
}
