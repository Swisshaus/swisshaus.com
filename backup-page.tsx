export default function ColorChoices() {
  const [selectedChoice, setSelectedChoice] = useState<ColorChoice | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const { openLightbox } = useLightbox();

  return (
    <main>
      <Container>
        <Header />
        <div className="mb-32">
          <h1>Test</h1>
        </div>
      </Container>
    </main>
  );
}