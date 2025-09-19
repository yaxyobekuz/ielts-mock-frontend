// Lottie
import Lottie from "lottie-react";

// React
import { useEffect } from "react";

// Api
import { linksApi } from "@/api/links.api";

// Toast
import { toast } from "@/notification/toast";

// Form components
import Button from "@/components/form/Button";

// Hooks
import useStore from "@/hooks/useStore";
import useModule from "@/hooks/useModule";
import useObjectState from "@/hooks/useObjectState";

// Page components
import ErrorContent from "../components/ErrorContent";

// Animated stickers
import coolSticker from "@/assets/animated/cool.json";
import hashtagOutSticker from "@/assets/animated/hashtag-out.json";

// Router
import { Navigate, useNavigate, useParams } from "react-router-dom";

const Link = () => {
  const { linkId } = useParams();
  const { updateProperty, getProperty } = useStore("start");
  const { link, error, isLoading, setField } = useObjectState({
    link: null,
    error: null,
    isLoading: true,
  });

  const testId = getProperty("testId");
  const isStarted = getProperty("isStarted");

  const loadLink = () => {
    setField("error", null);
    setField("isLoading", true);

    linksApi
      .preview(linkId)
      .then(({ code, link }) => {
        if (code !== "linkFound") throw new Error();
        if (!link.available) {
          return setField("error", {
            code: true,
            message: "Testni topshirish limiti maksimal darajaga yetib bo'ldi",
          });
        }
        setField("link", link);
      })
      .catch((err) => setField("error", err))
      .finally(() => setField("isLoading"));
  };

  useEffect(() => {
    !link && !isStarted && loadLink();
  }, []);

  if (isStarted) return <Navigate to={`/tutorial/${testId}`} />;
  if (isLoading) return <LoadingContent />;
  if (error) return <ErrorContent error={error} />;
  return <StartContent updateStart={updateProperty} linkId={linkId} />;
};

const LoadingContent = () => (
  <div className="flex flex-col items-center justify-center gap-8 w-full h-screen">
    <Lottie
      width="160"
      height="160"
      className="size-40"
      animationData={hashtagOutSticker}
    />
    <h1 className="text-2xl font-semibold">Ma'lumotlar yuklanmoqda...</h1>
  </div>
);

const StartContent = ({ linkId, updateStart }) => {
  const navigate = useNavigate();
  const { setModule } = useModule();
  const { isLoading, setField } = useObjectState({ isLoading: false });

  const handleStartTest = (e) => {
    e.preventDefault();
    if (isLoading) return;
    setField("isLoading", true);

    linksApi
      .addUsage(linkId)
      .then(({ code, test }) => {
        if (code !== "usageAdded" || !test) throw new Error();

        // Store start data
        updateStart("linkId", linkId);
        updateStart("isStarted", true);
        updateStart("testId", test._id);

        // Update test data
        setModule(test.reading?.parts, test._id, "reading");
        setModule(test.writing?.parts, test._id, "writing");
        setModule(test.listening?.parts, test._id, "listening");

        // Navigate user tot tutorial page
        navigate(`/tutorial/${test._id}`);
      })
      .catch(({ code, message }) => {
        toast.error(code ? message : "Nimadir xato ketdi");
      })
      .finally(() => setField("isLoading"));
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full h-screen">
      <Lottie
        width="160"
        height="160"
        className="size-40"
        animationData={coolSticker}
      />

      {/* Title */}
      <h1 className="text-2xl font-semibold">Test boshlash uchun tayyor</h1>

      {/* Button */}
      <Button size="lg" disabled={isLoading} onClick={handleStartTest}>
        Testni boshlash{isLoading && "..."}
      </Button>
    </div>
  );
};

export default Link;
