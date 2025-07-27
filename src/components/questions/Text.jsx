import { useLocation, useNavigate, useParams } from "react-router-dom";
import { memo, useEffect, useRef, useCallback, useMemo } from "react";

// Helpers
import { convertToHtml } from "../../lib/helpers";

// Hooks
import useLocalStorage from "../../hooks/useLocalStorage";

const Text = memo(({ text, initialNumber }) => {
  const textRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { questionNumber } = useParams();
  const { getData, updateProperty } = useLocalStorage("answers");

  // Cache path segments and saved data
  const pathSegments = useMemo(
    () => location.pathname.split("/").filter(Boolean),
    [location.pathname]
  );

  const savedData = useMemo(
    () => getData() || {},
    [getData, location.pathname]
  );

  // Navigate to specific input number
  const handleNavigate = useCallback(
    (inputNumber) => {
      const [first, second, third] = pathSegments;
      navigate(`/${first}/${second}/${third}/${inputNumber}`);
    },
    [pathSegments, navigate]
  );

  // Update input width based on content
  const updateInputWidth = useCallback((input, value) => {
    const hiddenText = input.parentElement?.querySelector(".hidden-text");
    if (hiddenText) {
      hiddenText.innerHTML = value;
      input.style.width = `${hiddenText.offsetWidth + 20}px`;
    }
  }, []);

  // Handle input value changes
  const handleInputChange = useCallback(
    (input) => {
      const inputNumber = input.getAttribute("data-number");
      const inputValue = input.value;

      updateProperty(inputNumber, inputValue);
      updateInputWidth(input, inputValue);
    },
    [updateProperty, updateInputWidth]
  );

  // Handle active input styling and focus
  const handleActiveInput = useCallback(
    (inputs) => {
      inputs.forEach((input) => {
        const inputNumber = input.getAttribute("data-number");
        if (!inputNumber) return;

        // Remove active class from all inputs first
        input.classList.remove("active");

        // Add active class and focus to current question
        if (questionNumber === inputNumber) {
          input.classList.add("active");
          input.focus();
        }
      });
    },
    [questionNumber]
  );

  // Setup event listeners for inputs
  useEffect(() => {
    const element = textRef.current;
    if (!element || !text) return;

    const inputs = element.querySelectorAll("input");
    const cleanupFunctions = [];

    inputs.forEach((input) => {
      const inputNumber = input.getAttribute("data-number");
      if (!inputNumber) return;

      // Event handlers
      const onInput = () => handleInputChange(input);
      const onInteraction = () => handleNavigate(inputNumber);

      // Add listeners
      input.addEventListener("input", onInput);
      input.addEventListener("click", onInteraction);
      input.addEventListener("focus", onInteraction);

      // Store cleanup function
      cleanupFunctions.push(() => {
        input.removeEventListener("input", onInput);
        input.removeEventListener("click", onInteraction);
        input.removeEventListener("focus", onInteraction);
      });
    });

    return () => cleanupFunctions.forEach((cleanup) => cleanup());
  }, [text, handleNavigate, handleInputChange]);

  // Restore saved values and handle active state
  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const inputs = element.querySelectorAll("input");

    // Handle active input state
    handleActiveInput(inputs);

    // Restore saved values
    inputs.forEach((input) => {
      const inputNumber = input.getAttribute("data-number");
      if (!inputNumber) return;

      const savedValue = savedData[inputNumber] || "";
      input.value = savedValue;
      updateInputWidth(input, savedValue);
    });
  }, [savedData, updateInputWidth, handleActiveInput]);

  if (!text) return null;

  return (
    <pre
      ref={textRef}
      className="flex-1 overflow-auto max-w-none"
      dangerouslySetInnerHTML={{ __html: convertToHtml(text, initialNumber) }}
    />
  );
});

Text.displayName = "Text";

export default Text;
