// React
import { useEffect } from "react";

// Lottie
import Lottie from "lottie-react";

// Api
import { linksApi } from "@/api/links.api";

// Icons
import { ChevronRight } from "lucide-react";

// Toast
import { toast } from "@/notification/toast";

// Form components
import Input from "@/components/form/Input";
import Button from "@/components/form/Button";

// Hooks
import useModule from "@/hooks/useModule";
import useObjectState from "@/hooks/useObjectState";

// Page components
import ErrorContent from "../components/ErrorContent";

// Router
import { useNavigate, useParams } from "react-router-dom";

// Animated stickers
import hashtagOutSticker from "@/assets/animated/hashtag-out.json";

const Link = () => {
  const { linkId } = useParams();
  const { link, error, isLoading, setField } = useObjectState({
    link: null,
    error: null,
    isLoading: true,
  });

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
    !link && loadLink();
  }, []);

  if (isLoading) return <LoadingContent />;
  if (error) return <ErrorContent error={error} />;
  return <FormContent link={link} linkId={linkId} />;
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

const FormContent = ({ linkId }) => {
  const navigate = useNavigate();
  const { setModule } = useModule();
  const { name, age, phone, isLoading, setField } = useObjectState({
    name: "",
    age: "",
    phone: "",
    isLoading: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;
    setField("isLoading", true);

    linksApi
      .addUsage(linkId, { age, name, phone })
      .then(({ code, test }) => {
        if (code !== "usageAdded" || !test) throw new Error();

        // Update test data
        setModule(test.reading?.parts, test._id, "reading");
        setModule(test.writing?.parts, test._id, "writing");
        setModule(test.listening?.parts, test._id, "listening");

        // Navigate user
        navigate(`/tests/test/${test._id}/module/listening/1/1`);
      })
      .catch(({ code, message }) => {
        toast.error(code ? message : "Nimadir xato ketdi");
      })
      .finally(() => setField("isLoading"));
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full h-screen px-5">
      <div className="relative max-w-md w-full bg-gray-50 p-6 rounded-3xl overflow-hidden">
        <div
          className={`${
            isLoading ? "opacity-50 select-none" : "opacity-100"
          } w-full transition-opacity duration-200`}
        >
          {/* Title */}
          <h1 className="mb-1.5 text-center text-xl font-semibold">
            Ma'lumotlarni to'ldiring
          </h1>

          {/* Description */}
          <p className="mb-3.5 text-center text-gray-500 text-[17px]">
            Biz sizning ma'lumotlaringizni kelajakda test <br /> natijasini
            yuborish uchun foydalanamiz
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <Input
              border
              required
              size="lg"
              name="name"
              label="Ism"
              value={name}
              disabled={isLoading}
              placeholder="Ismingizni kiriting"
              onChange={(value) => setField("name", value)}
            />

            <Input
              border
              required
              size="lg"
              type="tel"
              name="tel"
              value={phone}
              label="Tel raqam"
              disabled={isLoading}
              placeholder="+998 (__) ___-__-__"
              onChange={(value) => setField("phone", value)}
            />

            <Input
              border
              min={7}
              required
              max={100}
              size="lg"
              name="age"
              value={age}
              label="Yosh"
              type="number"
              disabled={isLoading}
              placeholder="Yoshingizni kiriting"
              onChange={(value) => setField("age", value)}
            />

            <Button
              size="lg"
              disabled={isLoading}
              className="w-full !mt-5 gap-1.5"
            >
              <span>Testni boshlash</span>
              <ChevronRight size={20} />
            </Button>
          </form>
        </div>

        {/* Loader */}
        {isLoading && (
          <div className="bar-loader-secondary absolute bottom-0 inset-x-0 w-full h-1" />
        )}
      </div>
    </div>
  );
};

export default Link;
